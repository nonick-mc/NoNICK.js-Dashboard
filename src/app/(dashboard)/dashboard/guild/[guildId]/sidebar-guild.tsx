import { Discord } from '@/lib/constants';
import { getGuild } from '@/lib/discord';
import { RefreshCcwIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function SidebarGuild({ guildId }: { guildId: string }) {
  const guild = await getGuild(guildId).catch(() => undefined);

  return (
    <div className='flex items-center gap-4'>
      <Image
        className='rounded-lg'
        src={
          guild?.icon
            ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
            : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
        }
        width={60}
        height={60}
        alt='サーバーアイコン'
      />
      <div className='flex-1'>
        <p className='text-lg font-black'>{guild?.name || '不明なサーバー'}</p>
        <Link
          href='/dashboard'
          className='flex items-center gap-1 text-blue-500'
        >
          <RefreshCcwIcon size={15} />
          <span className='text-sm'>サーバーを変更</span>
        </Link>
      </div>
    </div>
  );
}
