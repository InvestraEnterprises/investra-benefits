import GuestView from '@/components/GuestView';

export const dynamic = 'force-dynamic';

export default function Home() {
  return <GuestView source="DIRECT_VISIT" />;
}
