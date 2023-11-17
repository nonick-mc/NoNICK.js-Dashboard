'use client';

import { Chip, Select, SelectItem, SelectProps, SelectedItems } from '@nextui-org/react';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import {
  HashIcon,
  HeadphonesIcon,
  ImageIcon,
  LucideIcon,
  MegaphoneIcon,
  MessageCircleIcon,
  MessagesSquareIcon,
  Volume2Icon,
  WorkflowIcon,
} from 'lucide-react';
import { createElement } from 'react';

export type ChannelSelectProps = {
  channels: APIChannel[];
  filter?: (channel: APIChannel) => boolean;
} & Omit<SelectProps, 'children' | 'renderValue' | 'items' | 'placeholder'>;

const channelTypeEmojis = new Map<number, LucideIcon>([
  [ChannelType.GuildAnnouncement, MegaphoneIcon],
  [ChannelType.GuildCategory, WorkflowIcon],
  [ChannelType.GuildForum, MessagesSquareIcon],
  [ChannelType.GuildMedia, ImageIcon],
  [ChannelType.GuildStageVoice, HeadphonesIcon],
  [ChannelType.GuildText, HashIcon],
  [ChannelType.GuildVoice, Volume2Icon],
  [ChannelType.PublicThread, MessageCircleIcon],
  [ChannelType.PrivateThread, MessageCircleIcon],
]);

export function ChannelSelect({ channels, filter, isMultiline, ...props }: ChannelSelectProps) {
  return (
    <Select
      items={channels.filter((channel) => (filter ? filter(channel) : true))}
      variant='bordered'
      placeholder='チャンネルを選択'
      selectionMode={isMultiline ? 'multiple' : 'single'}
      isMultiline={isMultiline}
      renderValue={(items: SelectedItems<APIChannel>) => (
        <div className='flex flex-wrap items-center gap-1'>
          {items.map((item) =>
            isMultiline ? (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ) : (
              <div className='flex items-center gap-1' key={item.key}>
                {createElement(channelTypeEmojis.get(item.data?.type!) || HashIcon, {
                  size: 18,
                  className: 'text-default-500',
                })}
                <span className='text-foreground'>{item.data?.name}</span>
              </div>
            ),
          )}
        </div>
      )}
      {...props}
    >
      {(channel) => (
        <SelectItem key={channel.id} value={channel.id} textValue={channel.name ?? undefined}>
          <div className='flex items-center gap-2'>
            {createElement(channelTypeEmojis.get(channel.type) || HashIcon, {
              size: 18,
              className: 'text-default-500',
            })}
            <span className='text-foreground'>{channel.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
