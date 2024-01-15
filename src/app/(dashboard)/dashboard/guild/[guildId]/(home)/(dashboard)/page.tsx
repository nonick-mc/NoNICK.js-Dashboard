import { getGuild } from '@/lib/discord';
import { Snowflake, getDate } from 'discord-snowflake';
import { Metadata } from 'next';
import { Calendar, Rocket, UsersGroupRounded } from 'solar-icon-set';
import { Header } from '../../header';
import { StatsCard } from './stats-card';

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
      <Header title='ダッシュボード' />
      <div className='grid grid-col-2 sm:grid-cols-3 gap-4'>
        <StatsCard
          label='メンバー数'
          value={(guild.approximate_member_count || 0).toLocaleString()}
          icon={UsersGroupRounded}
        />
        <StatsCard
          label='ブースト数'
          value={(guild.premium_subscription_count || 0).toLocaleString()}
          icon={Rocket}
        />
        <StatsCard
          className='col-span-2 sm:col-auto'
          label='サーバー作成日'
          value={`${createAt.getFullYear()}年${createAt.getMonth()}月${createAt.getDate()}日`}
          icon={Calendar}
        />
      </div>
    </>
  );
}
