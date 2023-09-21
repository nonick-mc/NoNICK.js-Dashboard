'use server';

import ServerSettings, { IServerSettings } from '@/schemas/ServerSettings';
import dbConnect from './dbConnect';
import { wait } from './utils';

export async function getServerSetting<T extends keyof IServerSettings>(guildId: string, path: T) {
  await dbConnect();
  return (await ServerSettings.findOne({ serverId: guildId }))?.[path];
}

export async function patchServerSetting<T extends keyof IServerSettings>(
  guildId: string,
  path: T,
  values: any,
  disableCooldown?: boolean,
) {
  await dbConnect();

  const res = await ServerSettings.findOneAndUpdate(
    { serverId: guildId },
    { $set: { [path]: values } },
    { upsert: true },
  );

  await res?.save({ wtimeout: 1500 });
  if (!disableCooldown) await wait(1000);
}
