import { Discord } from '@/lib/constants';
import * as z from 'zod';

export const ReportZodSchema = z.object({
  channel: z.string().regex(Discord.Regex.Snowflake, '無効なチャンネルIDです'),
  includeModerator: z.boolean(),
  progressButton: z.boolean(),
  mention: z.discriminatedUnion('enable', [
    z.object({
      enable: z.literal(true),
      role: z.string().regex(Discord.Regex.Snowflake, '無効なロールIDです'),
    }),
    z.object({
      enable: z.literal(false),
      role: z.string().nullable(),
    }),
  ]),
});
