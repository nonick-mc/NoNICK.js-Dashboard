import { Discord } from '@/lib/constants';
import * as z from 'zod';

// TODO: スキーマの共通化

export const publishAnnounceZodSchema = z.object({
  enable: z.boolean(),
  channels: z.array(
    z.string().regex(Discord.Regex.Snowflake, '無効なチャンネルIDです'),
  ),
});
