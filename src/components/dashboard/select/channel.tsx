import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Discord } from '@/utils/constants';
import { APIChannel, APIGuildChannel, APIGuildChannelResolvable, APIGuildTextChannel, APITextBasedChannel, ChannelType, GuildChannelType, GuildTextChannelType } from 'discord-api-types/v10';

interface Props {
  defaultValue?: string,
  guildId: string,
  permissions?: number[],
}

async function fetchChannels(guildId: string) {
  return await fetch(`${Discord.API}/guilds/${guildId}/channels`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}` },
    next: { revalidate: 10 }
  }).then(async res => await res.json<APIGuildChannel<GuildChannelType>[]>());
}

export async function TextChannelSelect({ defaultValue, guildId }: Props) {
  const allChannels = await fetchChannels(guildId);
  const categoryChannels = allChannels.filter(ch => ch.type === ChannelType.GuildCategory);
  const textChannels = allChannels.filter(ch => ch.type === ChannelType.GuildText);

  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="チャンネルを選択" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className='h-[400px]'>
          {textChannels.map(({ id, name }, index) => (
            <SelectItem className='flex items-end justify-between' key={index} value={id}>
              <p>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</p>
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  )
}