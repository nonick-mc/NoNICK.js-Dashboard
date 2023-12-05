import { APIChannel, APIGuild, APIRole } from 'discord-api-types/v10';
import { Discord } from './constants';

export async function getGuild(guildId: string, withCounts?: boolean) {
  const res = await fetch(
    `${Discord.Endpoints.API}/guilds/${guildId}?with_counts=${!!withCounts}`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      next: { revalidate: 5 },
    },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIGuild>();
}

export async function getChannels(guildId: string) {
  const res = await fetch(
    `${Discord.Endpoints.API}/guilds/${guildId}/channels`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      next: { revalidate: 5 },
    },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIChannel[]>();
}

export async function getRoles(guildId: string) {
  const res = await fetch(`${Discord.Endpoints.API}/guilds/${guildId}/roles`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 5 },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIRole[]>();
}

export function hasPermission(target: string, permission: number) {
  return (parseInt(target) & permission) === permission;
}
