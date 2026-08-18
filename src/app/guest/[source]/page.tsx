import GuestView from '@/components/GuestView';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default async function GuestSourcePage({ params }: { params: { source: string } }) {
  const resolvedParams = await params;
  return <GuestView source={resolvedParams.source} />
}
