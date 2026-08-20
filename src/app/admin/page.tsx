import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isAdmin()) redirect('/admin/login');
  const [events, offers, partners, categories, properties] = await Promise.all([
    prisma.trackingEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 1000 }).catch(() => []),
    prisma.offer.findMany({ include: { partner: true, category: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.partner.findMany({ where: { active: true }, orderBy: { name: 'asc' } }).catch(() => []),
    prisma.category.findMany({ where: { active: true }, orderBy: { name: 'asc' } }).catch(() => []),
    prisma.property.findMany({ where: { active: true }, orderBy: { name: 'asc' } }).catch(() => []),
  ]);
  const counts = {
    pageViews: events.filter((e) => e.eventType === 'PAGE_VIEW').length,
    offerViews: events.filter((e) => e.eventType === 'OFFER_VIEW').length,
    clicks: events.filter((e) => e.eventType === 'AFFILIATE_CLICK').length,
    voucherViews: events.filter((e) => e.eventType === 'VOUCHER_VIEW').length,
    redeemed: events.filter((e) => e.eventType === 'VOUCHER_REDEEMED').length,
  };
  const safeOffers = offers.map((offer) => ({
    id: offer.id,
    slug: offer.slug,
    title: offer.title,
    discount: offer.discount,
    offerType: offer.offerType,
    partner: { id: offer.partner.id, name: offer.partner.name },
    category: offer.category ? { id: offer.category.id, name: offer.category.name } : null,
  }));
  const safePartners = partners.map((partner) => ({ id: partner.id, name: partner.name }));
  const safeCategories = categories.map((category) => ({ id: category.id, name: category.name }));
  const safeProperties = properties.map((property) => ({ id: property.id, name: property.name, slug: property.slug }));

  return <AdminClient counts={counts} offers={safeOffers} partners={safePartners} categories={safeCategories} properties={safeProperties} />;
}
