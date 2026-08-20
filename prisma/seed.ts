import { PrismaClient, OfferType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    ['Car Rental', 'car-rental'],
    ['Boat Trips', 'boat-trips'],
    ['Tours & Excursions', 'tours-excursions'],
    ['Restaurants', 'restaurants'],
    ['Spa & Wellness', 'spa-wellness'],
    ['Transfers', 'transfers'],
    ['Activities', 'activities'],
    ['Shopping', 'shopping'],
  ];

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: { name, active: true },
      create: { name, slug },
    });
  }

  await prisma.property.upsert({
    where: { slug: 'investra-property-01' },
    update: { name: 'INVESTRA Property 01', active: true },
    create: { name: 'INVESTRA Property 01', slug: 'investra-property-01' },
  });

  const rentPartner = await prisma.partner.upsert({
    where: { id: 'demo-rent-partner' },
    update: { name: 'Demo Rent a Car', active: true },
    create: { id: 'demo-rent-partner', name: 'Demo Rent a Car' },
  });

  const boatPartner = await prisma.partner.upsert({
    where: { id: 'demo-boat-partner' },
    update: { name: 'Demo Boat Tours', active: true },
    create: { id: 'demo-boat-partner', name: 'Demo Boat Tours' },
  });

  const spaPartner = await prisma.partner.upsert({
    where: { id: 'demo-spa-partner' },
    update: { name: 'Demo Spa', active: true },
    create: { id: 'demo-spa-partner', name: 'Demo Spa' },
  });

  const restaurantPartner = await prisma.partner.upsert({
    where: { id: 'demo-restaurant-partner' },
    update: { name: 'Demo Restaurant', active: true },
    create: { id: 'demo-restaurant-partner', name: 'Demo Restaurant' },
  });

  const cat = async (slug: string) => prisma.category.findUniqueOrThrow({ where: { slug } });

  await prisma.offer.upsert({
    where: { slug: 'demo-economy-car-rental' },
    update: { active: true },
    create: {
      slug: 'demo-economy-car-rental',
      title: 'Economy Car Rental',
      description: 'Reliable and convenient car rental for your North Cyprus stay.',
      discount: '10% OFF',
      regularPrice: '€40/day',
      guestPrice: '€36/day',
      offerType: OfferType.AFFILIATE,
      affiliateUrl: 'https://example.com/?ref=investra',
      partnerId: rentPartner.id,
      categoryId: (await cat('car-rental')).id,
    },
  });

  await prisma.offer.upsert({
    where: { slug: 'demo-sunset-boat-experience' },
    update: { active: true },
    create: {
      slug: 'demo-sunset-boat-experience',
      title: 'Sunset Boat Experience',
      description: 'A relaxed sunset experience along the North Cyprus coast.',
      discount: '15% OFF',
      regularPrice: '€70',
      guestPrice: '€59.50',
      offerType: OfferType.AFFILIATE,
      affiliateUrl: 'https://example.com/?ref=investra-boat',
      partnerId: boatPartner.id,
      categoryId: (await cat('boat-trips')).id,
    },
  });

  await prisma.offer.upsert({
    where: { slug: 'demo-relaxation-treatment' },
    update: { active: true },
    create: {
      slug: 'demo-relaxation-treatment',
      title: 'Relaxation Treatment',
      description: 'A relaxing treatment with an exclusive guest discount.',
      discount: '15% OFF',
      regularPrice: '€60',
      guestPrice: '€51',
      offerType: OfferType.VOUCHER,
      voucherCode: 'INVESTRA15',
      partnerId: spaPartner.id,
      categoryId: (await cat('spa-wellness')).id,
    },
  });

  await prisma.offer.upsert({
    where: { slug: 'demo-dinner-for-two' },
    update: { active: true },
    create: {
      slug: 'demo-dinner-for-two',
      title: 'Dinner for Two',
      description: 'Enjoy a special guest benefit when dining at this partner restaurant.',
      discount: '10% OFF',
      offerType: OfferType.VOUCHER,
      voucherCode: 'INVESTRA10',
      partnerId: restaurantPartner.id,
      categoryId: (await cat('restaurants')).id,
    },
  });
}

main().finally(async () => prisma.$disconnect());
