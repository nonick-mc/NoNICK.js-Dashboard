'use client';

import { usePRouter } from '@/hooks/use-prouter';
import { Discord } from '@/lib/constants';
import { Avatar } from '@nextui-org/react';
import { Select, SelectItem, SelectedItems } from '@nextui-org/select';
import { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { Key } from 'react';

type Props = {
  mutualGuilds: RESTAPIPartialCurrentUserGuild[];
};

export function SidebarGuildSelect({ mutualGuilds }: Props) {
  const router = usePRouter();
  const guildId = useParams().guildId as string;

  function renderValue(items: SelectedItems<RESTAPIPartialCurrentUserGuild>) {
    return (
      <div className='flex flex-wrap items-center'>
        {items.map((item) => (
          <SingleSelectItem guild={item.data} key={item.data?.id} />
        ))}
      </div>
    );
  }

  return (
    <Select
      onChange={(e) => router.push(`/dashboard/guild/${e.target.value}`)}
      defaultSelectedKeys={[guildId]}
      items={mutualGuilds}
      size='md'
      variant='bordered'
      aria-label='サーバー選択'
      renderValue={renderValue}
      disallowEmptySelection
    >
      {(guild) => (
        <SelectItem key={guild.id} value={guild.id} textValue={guild.name}>
          <SingleSelectItem guild={guild} />
        </SelectItem>
      )}
    </Select>
  );
}

function SingleSelectItem({
  guild,
  key,
}: { guild?: RESTAPIPartialCurrentUserGuild | null; key?: Key }) {
  return (
    <div className='flex items-center gap-3 text-foreground' key={key}>
      <Avatar
        src={
          guild?.icon
            ? `${Discord.Endpoints.CDN}/icons/${guild.id}/${guild.icon}.webp`
            : `${Discord.Endpoints.CDN}/embed/avatars/0.png`
        }
        size='sm'
        aria-label='サーバーアイコン'
      />
      <span className='font-semibold'>{guild?.name}</span>
    </div>
  );
}
