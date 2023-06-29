import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { Card } from '../ui/card';
import { authOption } from '@/app/api/auth/[...nextauth]/route';
import { Separator } from '../ui/separator';
import { Discord } from '@/utils/constants';
import { PartialGuild } from '@/types/discord';
import { hasPermission } from '@/utils/functions';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

async function fetchGuilds(authorization: string) {
  return await fetch(`${Discord.API}/users/@me/guilds`, {
    cache: 'no-store',
    headers: { Authorization: authorization }
  })
  .then(async res => {
    if (!res.ok)
      throw new Error(res.statusText);
    return await res.json<PartialGuild[]>()
  })
  .catch(err => {
    throw new Error(err);
  });
}

async function fetchMutualGuilds(token: string) {
  const userGuilds = await fetchGuilds(`Bearer ${token}`);

  return userGuilds
    .filter(userGuild => hasPermission(userGuild.permissions, Discord.Permissions.ManageGuild))
}

export async function GuildSelector() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return;

  const guilds = await fetchMutualGuilds(session?.accessToken!);

  return (
    <Card className='flex flex-col w-[500px] h-[600px] p-6'>
      <section className='space-y-2'>
        <h1 className='text-3xl font-black text-center'>サーバーを選択</h1>
        <div className='flex gap-2 items-center justify-center'>
          <div className='flex items-center gap-1'>
            <Image
              className='rounded-full'
              src={session?.user?.image || '/discord.png'}
              width={20}
              height={20}
              alt={`${session?.user?.name}'s avatar`}
            />
            <p className='text-zinc-400'>@{session?.user?.name}</p>
          </div>
          <p>としてログイン中</p>
        </div>
      </section>
      <Separator className='my-6'/>
      <ScrollArea className='flex-1 space-y-2'>
        {guilds.map((guild, index) => (
          <Link href={`/dashboard/${guild.id}`} key={index} prefetch={false}>
            <div className='flex items-center justify-between transition ease-in-out hover:bg-zinc-500/20 rounded-lg p-3 cursor-pointer'>
              <div className='flex flex-1 items-center gap-3'>
                <Image
                  className='rounded-full'
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  width={35}
                  height={35}
                  alt={`${guild.name}'s icon`}
                />
                <p className='text-base font-bold'>
                  {guild.name.length > 30 ? `${guild.name.substring(0, 30)} ...` : guild.name}
                </p>
              </div>
              <ArrowRightIcon width={20} height={20}/>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </Card>
  )
}