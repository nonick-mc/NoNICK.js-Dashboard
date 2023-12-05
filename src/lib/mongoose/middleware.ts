'use server';

import ServerSettings, { IServerSettings } from '@/models/settingModel';
import dbConnect from './connect';
import { wait } from '../utils';

export async function getServerSetting<T extends keyof IServerSettings>(
  guildId: string,
  path: T,
) {
  await dbConnect();
  return (await ServerSettings.findOne({ serverId: guildId }))?.[path];
}

export async function patchServerSetting(
  guildId: string,
  path: Paths<IServerSettings>,
  values: any,
  disableCooldown?: boolean,
) {
  await dbConnect();
  await ServerSettings.findOneAndUpdate(
    { serverId: guildId },
    { $set: { [path]: values } },
    { upsert: true },
  ).exec();
  if (!disableCooldown) await wait(1000);
}
