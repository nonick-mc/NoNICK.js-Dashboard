'use server';

import { ModerateSetting } from '@/database/models';
import { dbConnect } from '@/lib/mongoose';
import { wait } from '@/lib/utils';
import * as z from 'zod';
import { schema } from './form';

export async function updateServerSetting(
  guildId: string,
  values: z.infer<typeof schema>,
) {
  try {
    await dbConnect();

    await ModerateSetting.findOneAndUpdate(
      { serverId: guildId },
      { $set: { report: values } },
      { upsert: true },
    ).exec();

    await wait(1000);

    return { isSuccess: true };
  } catch (error) {
    console.error(error);
    return { isSuccess: false };
  }
}
