import { Skeleton } from '@/components/ui/skeleton';
import { Header, Shell } from '../../formats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '入退室メッセージ',
}

export default function Page() {
  return (
    <Shell>
      <Header title='入退室メッセージ' description='サーバーに新しいメンバーが入室したり、退室したりした際にメッセージを送信します。'/>
    </Shell>
  );
}