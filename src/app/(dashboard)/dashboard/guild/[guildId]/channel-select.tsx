'use client';

import { GuildChannel } from '@/types/discord';
import { SolarIcon } from '@/types/solar-icon';
import { Chip } from '@nextui-org/chip';
import {
  Select,
  SelectItem,
  SelectProps,
  SelectedItems,
} from '@nextui-org/select';
import { ChannelType } from 'discord-api-types/v10';
import { createElement } from 'react';
import {
  ChatRound,
  Folder2,
  GalleryMinimalistic,
  Hashtag,
  HashtagChat,
  Mailbox,
  Translation2,
  VolumeLoud,
} from 'solar-icon-set';

const channelTypeIcons = new Map<ChannelType, SolarIcon>([
  [ChannelType.GuildAnnouncement, Mailbox],
  [ChannelType.AnnouncementThread, HashtagChat],
  [ChannelType.GuildCategory, Folder2],
  [ChannelType.GuildForum, ChatRound],
  [ChannelType.GuildMedia, GalleryMinimalistic],
  [ChannelType.GuildStageVoice, Translation2],
  [ChannelType.GuildText, Hashtag],
  [ChannelType.GuildVoice, VolumeLoud],
  [ChannelType.PublicThread, HashtagChat],
  [ChannelType.PrivateThread, HashtagChat],
]);

type Props = {
  channels: GuildChannel[];
  types?: ChannelType[];
} & Omit<SelectProps, 'children' | 'renderValue' | 'items' | 'placeholder'>;

export function ChannelSelect({
  channels,
  types,
  selectionMode,
  ...props
}: Props) {
  return (
    <Select
      items={channels
        .filter((channel) => (types ? types.includes(channel.type) : true))
        .sort((a, b) => a.position - b.position)}
      variant='bordered'
      placeholder='チャンネルを選択'
      selectionMode={selectionMode ?? 'single'}
      renderValue={(items: SelectedItems<GuildChannel>) => (
        <div className='flex flex-wrap items-center gap-1'>
          {items.map((item) =>
            selectionMode === 'multiple' ? (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ) : (
              <div
                className='flex items-center gap-1 text-default-500'
                key={item.key}
              >
                {createElement(
                  // biome-ignore lint/style/noNonNullAssertion: <explanation>
                  channelTypeIcons.get(item.data?.type!) || Hashtag,
                  { size: 18, iconStyle: 'Bold' },
                )}
                <span className='text-foreground'>{item.data?.name}</span>
              </div>
            ),
          )}
        </div>
      )}
      {...props}
    >
      {(channel) => (
        <SelectItem
          key={channel.id}
          value={channel.id}
          textValue={channel.name ?? undefined}
        >
          <div className='flex items-center gap-2 text-default-500'>
            {createElement(channelTypeIcons.get(channel.type) || Hashtag, {
              size: 18,
              iconStyle: 'Bold',
            })}
            <span className='text-foreground'>{channel.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
