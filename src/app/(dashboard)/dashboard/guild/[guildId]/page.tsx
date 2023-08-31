import { Card } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ダッシュボード',
}

export default function Page({ params: { guildId } }: { params: { guildId: string } }) {
  return (
    <Card className='p-6 h-full'>
      
    </Card>
  )
}