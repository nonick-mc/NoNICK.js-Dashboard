import { GuildChannel } from '@/types/discord';
import {
  APIGuild,
  APIRole,
  RESTAPIPartialCurrentUserGuild,
} from 'discord-api-types/v10';
import { Discord } from './constants';

export async function getUserGuilds(token: string) {
  const res = await fetch(`${Discord.Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<RESTAPIPartialCurrentUserGuild[]>();
}

export async function getGuild(guildId: string, withCounts?: boolean) {
  const res = await fetch(
    `${Discord.Endpoints.API}/guilds/${guildId}?with_counts=${!!withCounts}`,
    {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      next: { revalidate: 10 },
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
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<GuildChannel[]>();
}

export async function getRoles(guildId: string) {
  const res = await fetch(`${Discord.Endpoints.API}/guilds/${guildId}/roles`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIRole[]>();
}

export function hasPermission(target: string, permission: number) {
  return (parseInt(target) & permission) === permission;
}
