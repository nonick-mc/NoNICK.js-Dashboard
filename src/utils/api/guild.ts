import axios from 'axios';
import { Discord } from '../contants';
import { PartialGuild } from '@/types';

export async function fetchGuilds(token: string, authPrefix: string) {
  return axios
    .get<PartialGuild[]>(
      `${Discord.API}/users/@me/guilds`,
      { headers: { Authorization: `${authPrefix} ${token}` } }
    )
    .then(res => res.data)
    .catch(err => undefined)
}