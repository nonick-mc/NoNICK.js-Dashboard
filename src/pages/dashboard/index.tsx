import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

import { HomeAppBar } from '@/components/Appbar';
import { fetchGuilds } from '@/utils/api/guild';
import { hasPermission } from '@/utils/functions';
import { authOptions } from '../api/auth/[...nextauth]';
import { Discord } from '@/utils/contants';
import { PartialGuild } from '@/types';
import GuildCards from '@/components/dashboard/GuildCards';

type Props = {
  guilds: PartialGuild[],
}

export default function GuildSelect({ guilds }: Props) {
  return (
    <>
      <HomeAppBar/>
      <div className='px-10 flex-row gap-3'>
        <div className='text-center font-notoSansJp'>
          <h1 className='font-black'>サーバーを選択</h1>
          <p className='w-fit mx-auto px-5 py-4 bg-gray-900 rounded-lg'>
            自分のサーバーが表示されませんか？
            再読み込みを行うか、サーバーに
              <a
                className='no-underline text-blue-500 hover:text-blue-600'
                target='_blank'
                href={process.env.NEXT_PUBLIC_BOT_INVITE_URL}
                rel="noopener noreferrer"
              >NoNICK.jsを追加</a>
            しましょう。
          </p>
        </div>
      </div>
      <GuildCards guilds={guilds}/>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    const userGuilds = await fetchGuilds(session?.accessToken, 'Bearer');
    const botGuilds = await fetchGuilds(process.env.DISCORD_CLIENT_TOKEN, 'Bot');

    const adminGuilds = userGuilds
      ?.filter(v => hasPermission(v.permissions, Discord.Permissions.ManageGuild))
      ?.filter(userGuild => botGuilds?.some(botGuild => botGuild.id === userGuild.id))

    return { props: { guilds: adminGuilds } }
  }

  return { props: { guilds: [] } }
}