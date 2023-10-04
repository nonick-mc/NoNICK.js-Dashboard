import { APIChannel, APIGuild, APIRole } from 'discord-api-types/v10';
import { Discord } from './constants';
import { PartialGuild } from '@/types/discord';
import { getServerSession } from 'next-auth';
import { authOption } from '@/app/api/auth/[...nextauth]/route';

export async function getUserGuilds() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) throw new Error('Unauthorized');

  const res = await fetch(`${Discord.Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<PartialGuild[]>();
}

export async function getBotGuilds() {
  const res = await fetch(`${Discord.Endpoints.API}/users/@me/guilds`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 5 },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIGuild[]>();
}

export async function getGuild(guildId: string, withCounts?: boolean) {
  const res = await fetch(
    `${Discord.Endpoints.API}/guilds/${guildId}?with_counts=${!!withCounts}`,
    { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` }, next: { revalidate: 5 } },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json<APIGuild>();
}

export async function getChannels(guildId: string) {
  const res = await fetch(`${Discord.Endpoints.API}/guilds/${guildId}/channels`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 5 },
  });
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
