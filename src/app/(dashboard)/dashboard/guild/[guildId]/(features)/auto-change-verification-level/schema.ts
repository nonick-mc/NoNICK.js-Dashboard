import { GuildVerificationLevel } from 'discord-api-types/v10';
import * as z from 'zod';

const levelSchema = z.object({
  before: z
    .number()
    .min(GuildVerificationLevel.Low)
    .max(GuildVerificationLevel.VeryHigh)
    .nullable(),
  after: z.coerce
    .number()
    .min(GuildVerificationLevel.Low)
    .max(GuildVerificationLevel.VeryHigh),
});

const timeSchema = z
  .object({
    start: z.coerce
      .number({ invalid_type_error: '選択してください' })
      .min(0)
      .max(23),
    end: z.coerce
      .number({ invalid_type_error: '選択してください' })
      .min(0)
      .max(23),
  })
  .refine(({ start, end }) => start !== end, {
    path: ['end'],
    message: '開始・終了時間を同じ時間に設定することはできません',
  });

const logSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z.string({ required_error: '選択してください' }),
  }),
  z.object({
    enable: z.literal(false),
    channel: z.string(),
  }),
]);

export const memberVerifyZodSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    level: levelSchema,
    log: logSchema,
    time: timeSchema,
  }),
  z.object({
    enable: z.literal(false),
    level: z.object({
      before: z.number().nullable(),
      after: z.number(),
    }),
    log: z.object({
      enable: z.boolean(),
      channel: z.string().nullable(),
    }),
    time: z.object({
      start: z.number().nullable(),
      end: z.number().nullable(),
    }),
  }),
]);
