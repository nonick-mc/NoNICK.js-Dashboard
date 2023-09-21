import { dashboardConfig } from '@/config/dashboard';
import { Discord } from '@/lib/constants';
import { APIGuild } from 'discord-api-types/v10';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarItem } from './sidebar-item';
import React from 'react';
import { Skeleton } from '../../../../../components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

async function getGuild(guildId: string) {
  return await fetch(`${Discord.Endpoints.API}/guilds/${guildId}`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 120 },
  }).then((res) => res.json<APIGuild>());
}

export async function Sidebar({ guildId }: { guildId: string }) {
  const guild = await getGuild(guildId);
  const basePath = `/dashboard/guild/${guildId}`;

  return (
    <ScrollArea className='w-[280px]'>
      <div className='flex flex-col gap-6 pr-4'>
        <div className='flex items-center gap-4'>
          <Image
            className='rounded-lg'
            src={
              guild.icon
                ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
                : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
            }
            width={55}
            height={55}
            alt={`${guild.name}'s icon`}
          />
          <div className='flex-1'>
            <p className='text-lg font-black'>{guild.name}</p>
            <Link href='/dashboard' className='flex items-center gap-1 text-blue-500'>
              <RefreshCcw size={15} />
              <span className='text-sm'>サーバーを変更</span>
            </Link>
          </div>
        </div>
        {dashboardConfig.sidebar.map(({ label, items }, index) => (
          <ul key={index} className='space-y-2'>
            {label && (
              <li>
                <p className='font-extrabold'>{label}</p>
              </li>
            )}
            {items.map(({ href, label, badge, icon }, index) => (
              <SidebarItem
                href={basePath + href}
                icon={React.createElement(icon, { size: 15 })}
                badge={badge}
                key={index}
              >
                {label}
              </SidebarItem>
            ))}
          </ul>
        ))}
      </div>
    </ScrollArea>
  );
}

export function SidebarSkeleton() {
  return (
    <div className='flex w-[280px] flex-col gap-6 pr-4'>
      <div className='flex items-center gap-4'>
        <Skeleton className='h-[55px] w-[55px] rounded-lg' />
        <div className='flex flex-1 flex-col gap-1'>
          <Skeleton className='h-7 w-full' />
          <Skeleton className='h-5 w-32' />
        </div>
      </div>
      <ul className='space-y-2'>
        {Array(2)
          .fill(0)
          .map((v, index) => (
            <SidebarItemSkeleton key={index} />
          ))}
      </ul>
      <ul className='space-y-2'>
        <Skeleton className='h-6 w-[50px]' />
        {Array(7)
          .fill(0)
          .map((v, index) => (
            <SidebarItemSkeleton key={index} />
          ))}
      </ul>
    </div>
  );
}

function SidebarItemSkeleton() {
  return (
    <div className='flex items-center gap-3 px-3 py-2'>
      <Skeleton className='h-6 w-6 rounded-full' />
      <Skeleton className='h-5 flex-1' />
    </div>
  );
}
