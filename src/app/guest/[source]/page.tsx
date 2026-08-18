import GuestView from '@/components/GuestView';

export default function GuestSourcePage({ params }: { params: { source: string } }) {
  return <GuestView source={params.source} />
}
