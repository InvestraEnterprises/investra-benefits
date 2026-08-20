import Link from 'next/link';
import prisma from '@/lib/prisma';
import ClientTracker from '@/components/ClientTracker';

export const dynamic = 'force-dynamic';

const icons: Record<string, string> = {
  'car-rental': '🚗',
  'boat-trips': '🛥️',
  'tours-excursions': '🏝️',
  restaurants: '🍽️',
  'spa-wellness': '💆',
  transfers: '🚕',
  activities: '🎯',
  shopping: '🛍️',
};

export default async function GuestView({ source }: { source: string }) {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];
  let offers: Awaited<ReturnType<typeof prisma.offer.findMany>> = [];

  try {
    [categories, offers] = await Promise.all([
      prisma.category.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
      prisma.offer.findMany({
        where: { active: true },
        include: { partner: true, category: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);
  } catch {
    // The page remains usable if the database is temporarily unavailable.
  }

  return (
    <div className="min-h-screen bg-investra-light">
      <ClientTracker eventType="PAGE_VIEW" source={source} />

      <header className="sticky top-0 z-20 border-b border-white/40 bg-investra-light/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <img src="/brand/investra-logo.svg" alt="INVESTRA ENTERPRISES LTD" className="h-9 w-auto" />
          <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-investra-blue">EN</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <section className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 text-[11px] font-extrabold tracking-[0.25em] text-investra-gold">GUEST BENEFITS</div>
            <h1 className="serif text-5xl leading-[0.98] tracking-[-0.04em] text-investra-blue sm:text-7xl">
              Discover more.<br /><em className="text-investra-gold">Pay less.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-investra-muted sm:text-lg">
              Exclusive offers, discounts and local experiences for our guests in North Cyprus.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="serif text-3xl text-investra-blue">Explore offers</h2>
            <span className="text-xs font-semibold text-investra-muted">{offers.length} available</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <a key={category.id} href={`#${category.slug}`} className="whitespace-nowrap rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-bold text-investra-blue shadow-sm">
                <span className="mr-1">{icons[category.slug] || '✦'}</span>{category.name}
              </a>
            ))}
          </div>
        </section>

        {categories.length > 0 ? categories.map((category) => {
          const categoryOffers = offers.filter((offer) => offer.categoryId === category.id);
          if (!categoryOffers.length) return null;
          return (
            <section key={category.id} id={category.slug} className="pb-14 scroll-mt-24">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xl">{icons[category.slug] || '✦'}</span>
                <h2 className="serif text-2xl text-investra-blue">{category.name}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryOffers.map((offer) => (
                  <article key={offer.id} className="card overflow-hidden">
                    <div className="h-48 bg-investra-light">
                      {offer.imageUrl ? (
                        <img src={offer.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-investra-blue to-[#1c5879] px-8 text-center">
                          <span className="serif text-2xl italic text-white/90">{offer.partner.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-investra-gold">{offer.partner.name}</div>
                          <h3 className="serif mt-2 text-2xl text-investra-blue">{offer.title}</h3>
                        </div>
                        {offer.discount && <span className="gold-pill">{offer.discount}</span>}
                      </div>
                      {offer.description && <p className="mt-3 min-h-12 text-sm leading-6 text-investra-muted">{offer.description}</p>}
                      {(offer.regularPrice || offer.guestPrice) && (
                        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
                          <div>{offer.regularPrice && <div className="text-sm text-slate-400 line-through">{offer.regularPrice}</div>}</div>
                          {offer.guestPrice && <div className="text-right"><div className="text-[10px] font-bold uppercase tracking-wider text-investra-gold">Guest price</div><div className="text-xl font-black text-investra-blue">{offer.guestPrice}</div></div>}
                        </div>
                      )}
                      <Link href={`/offer/${offer.slug}?source=${encodeURIComponent(source)}`} className="brand-btn mt-5 block text-center">
                        {offer.offerType === 'VOUCHER' ? 'Get Discount' : 'Get Offer'}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        }) : (
          <div className="card p-10 text-center text-sm text-investra-muted">
            Offers are being prepared. Please check again soon.
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-investra-muted sm:px-8">
          <strong className="text-investra-blue">INVESTRA ENTERPRISES LTD</strong>
          <span>Guest Benefits · North Cyprus</span>
        </div>
      </footer>
    </div>
  );
}
