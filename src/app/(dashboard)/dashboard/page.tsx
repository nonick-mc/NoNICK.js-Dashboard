import { Metadata } from 'next';
import { PartialGuild } from '@/types/discord';
import { GuildTable } from './table';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'サーバー選択'
}

async function getMutualGuilds() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/guilds`,
    { headers: headers() }
  );
  return await res.json<PartialGuild[]>();
}

export default async function Page() {
  const guilds = await getMutualGuilds();

  return (
    <main className='container space-y-8 py-3'>
      <GuildTable guilds={guilds}/>
    </main>
  )
}