import GuestView from '@/components/GuestView';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function GuestSourcePage({ params }: { params: { source: string } }) {
  return <GuestView source={params.source} />;
}
