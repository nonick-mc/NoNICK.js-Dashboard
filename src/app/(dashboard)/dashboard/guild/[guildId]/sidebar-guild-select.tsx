'use client';

import { Discord } from '@/lib/constants';
import { Avatar } from '@nextui-org/react';
import { Select, SelectItem, SelectedItems } from '@nextui-org/select';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { useParams, useRouter } from 'next/navigation';

type Props = {
  mutualGuilds: RESTAPIPartialCurrentUserGuild[];
};

export function SidebarGuildSelect({ mutualGuilds }: Props) {
  const router = useRouter();
  const guildId = useParams().guildId as string;

  return (
    <Select
      onChange={(e) => router.push(`/dashboard/guild/${e.target.value}`)}
      defaultSelectedKeys={[guildId]}
      items={mutualGuilds}
      size='md'
      variant='faded'
      aria-label='サーバー選択'
      renderValue={(items: SelectedItems<RESTAPIPartialCurrentUserGuild>) => (
        <>
          {items.map((item) => (
            <div
              className='flex items-center gap-3 text-foreground'
              key={item.key}
            >
              <Avatar
                src={
                  item.data?.icon
                    ? `${Discord.Endpoints.CDN}/icons/${item.data?.id}/${item.data?.icon}.webp`
                    : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
                }
                size='sm'
                aria-label='サーバーアイコン'
              />
              <span className='font-semibold'>{item.data?.name}</span>
            </div>
          ))}
        </>
      )}
    >
      {(guild) => (
        <SelectItem key={guild.id} value={guild.id} textValue={guild.name}>
          <div className='flex items-center gap-3'>
            <Avatar
              src={
                guild.icon
                  ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
                  : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
              }
              size='sm'
              aria-label='サーバーアイコン'
            />
            <span className='font-semibold'>{guild.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
