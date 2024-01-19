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
import { Key, createElement } from 'react';
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
import { FormSelectClassNames } from './form-utils';

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
  selectionMode?: keyof typeof FormSelectClassNames;
} & Omit<
  SelectProps,
  'children' | 'renderValue' | 'items' | 'placeholder' | 'selectionMode'
>;

export function ChannelSelect({
  classNames,
  channels,
  types,
  selectionMode = 'single',
  ...props
}: Props) {
  const sortedChannels = channels
    .filter((channel) => (types ? types.includes(channel.type) : true))
    .sort((a, b) => a.position - b.position);

  function renderValue(items: SelectedItems<GuildChannel>) {
    return (
      <div className='flex flex-wrap items-center gap-1'>
        {items.map((item) =>
          selectionMode === 'multiple' ? (
            <MultipleSelectItem channel={item.data} key={item.key} />
          ) : (
            <SingleSelectItem channel={item.data} key={item.key} />
          ),
        )}
      </div>
    );
  }

  return (
    <Select
      classNames={classNames ?? FormSelectClassNames[selectionMode]}
      items={sortedChannels}
      variant='bordered'
      placeholder='チャンネルを選択'
      selectionMode={selectionMode}
      renderValue={renderValue}
      {...props}
    >
      {(channel) => (
        <SelectItem
          key={channel.id}
          value={channel.id}
          textValue={channel.name}
        >
          <SingleSelectItem channel={channel} />
        </SelectItem>
      )}
    </Select>
  );
}

export function SingleSelectItem({
  channel,
  key,
}: { channel?: GuildChannel | null; key?: Key }) {
  return (
    <div className='flex items-center gap-2 text-default-500' key={key}>
      {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
      {createElement(channelTypeIcons.get(channel?.type!) || Hashtag, {
        size: 18,
        iconStyle: 'Bold',
      })}
      <span className='text-foreground'>{channel?.name}</span>
    </div>
  );
}

export function MultipleSelectItem({
  channel,
  key,
}: { channel?: GuildChannel | null; key?: Key }) {
  return <Chip key={key}>{channel?.name}</Chip>;
}
