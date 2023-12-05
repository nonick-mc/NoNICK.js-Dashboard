import { Snowflake, getDate } from 'discord-snowflake';
import { Metadata } from 'next';
import { StatsCard } from './stats-card';
import { Calendar, InfoIcon, Rocket, Users } from 'lucide-react';
import { getGuild } from '@/lib/discord';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageActivityGraph } from './graphs';
import { Card } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'ダッシュボード',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const guild = await getGuild(guildId, true);
  const createAt = getDate(guildId as Snowflake);

  return (
    <>
      <Alert className='items-center' variant='primary'>
        <InfoIcon size={18} />
        <AlertTitle>このページはサンプルです。</AlertTitle>
        <AlertDescription>
          v5.0では、運営からのお知らせの確認はもちろん、サーバーの分析に役立つ情報を簡単に閲覧することができます。
        </AlertDescription>
      </Alert>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          <StatsCard
            label='メンバー数'
            value={guild.approximate_member_count!.toLocaleString()}
            icon={Users}
          />
          <StatsCard
            label='ブースト数'
            value={(guild.premium_subscription_count || 0).toLocaleString()}
            icon={Rocket}
          />
          <StatsCard
            label='サーバー作成日'
            value={`${createAt.getFullYear()}年${createAt.getMonth()}月${createAt.getDate()}日`}
            icon={Calendar}
          />
        </div>
        <div className='grid flex-1 grid-cols-12 gap-4'>
          <Card className='col-span-7 space-y-3 p-6'>
            <p>週間メッセージ数</p>
            <MessageActivityGraph />
          </Card>
          <Card className='col-span-5 space-y-3 p-6'>
            <p>運営からのお知らせ</p>
            <p className='text-muted-foreground text-center text-sm'>
              現在、お知らせはありません。
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
