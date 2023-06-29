import { StatsCard } from '@/components/dashboard/cards/stats';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Discord } from '@/utils/constants';
import { APIChannel, APIGuild } from 'discord-api-types/v10';
import { Snowflake, getDate } from 'discord-snowflake';
import { FiCalendar, FiHash, FiUsers } from 'react-icons/fi';

// const wait = async (ms: number) => {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve(); // setTimeoutの第一引数の関数として簡略化できる
//     }, ms)
//   });
// }

export default async function Page({ params }: { params: { guildId: string } }) {
  const guild = await fetch(`${Discord.API}/guilds/${params.guildId}?with_counts=true`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 30 }
  }).then(async res => await res.json<APIGuild>());

  const channels = await fetch(`${Discord.API}/guilds/${params.guildId}/channels`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 30 }
  }).then(async res => await res.json<APIChannel[]>());

  const guildCreatedDate = getDate(params.guildId as Snowflake);

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-3 gap-3'>
        <StatsCard value={String(guild.approximate_member_count)} icon={FiUsers}>メンバー数</StatsCard>
        <StatsCard value={String(channels.length)} icon={FiHash}>チャンネル数</StatsCard>
        <StatsCard value={`${guildCreatedDate.getFullYear()}年${guildCreatedDate.getMonth()}月${guildCreatedDate.getDay()}日`} icon={FiCalendar}>作成日</StatsCard>
      </div>
      <Skeleton className='w-full h-[300px] rounded-xl'></Skeleton>
      <Separator />
      <div className='space-y-2'>
        <h1 className='font-black text-2xl'>NoNICK.jsの機能を確認</h1>
        {/* <Tab */}
      </div>
    </div>
  )
}