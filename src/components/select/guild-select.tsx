import { Discord } from '@/utils/constants';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { PartialGuild } from '@/types/discord';
import { hasPermission } from '@/utils/functions';
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

async function fetchUserGuilds(token: string) {
  const guilds = await fetch(`${Discord.API}/users/@me/guilds`, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(async res => {
    if (!res.ok)
      throw new Error(res.statusText);
    return await res.json<PartialGuild[]>()
  })
  .catch(err => {
    throw new Error(err);
  });

  return guilds
    .filter(v => hasPermission(v.permissions, Discord.Permissions.ManageGuild))
}

export async function GuildSelect() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return;

  const guilds = await fetchUserGuilds(session.accessToken);

  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {guilds.map((guild, index) => (
            <SelectItem value={`${guild.id}`} key={index}>
              <div className='flex items-center justify-center gap-2'>
                <Image
                  className='rounded-full'
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                  width={25}
                  height={25}
                  alt={`${guild.name}'s icon`}
                />
                <p>{guild.name.length > 30 ? `${guild.name.substring(0, 30)} ...` : guild.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}