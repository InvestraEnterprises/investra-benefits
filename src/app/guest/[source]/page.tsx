import GuestView from '@/components/GuestView';

export const dynamic = 'force-dynamic';

export default function GuestSourcePage({ params }: { params: { source: string } }) {
  return <GuestView source={params.source} />
}
