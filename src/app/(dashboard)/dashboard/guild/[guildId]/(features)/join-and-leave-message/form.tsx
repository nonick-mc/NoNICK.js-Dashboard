'use client';

import { messageOptionSchema } from '@/lib/validations/discord';
import { IServerSettings } from '@/schemas/ServerSettings';
import { FC } from 'react';
import * as z from 'zod';

const joinAndLeaveMessageSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z.string({ required_error: '選択してください' }),
    messageOptions: messageOptionSchema,
  }),
  z.object({
    enable: z.literal(false),
    channels: z.string().optional(),
    messageOptions: messageOptionSchema.partial(),
  }),
]);

type Props = {
  setting: IServerSettings['message'] | undefined,
}

export const SettingForm: FC<Props> = ({ setting }) => {
  return (
    <div>a</div>
  );
}