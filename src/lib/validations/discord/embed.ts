import * as z from 'zod';
import { urlSchema } from '../index';

export namespace Embed {
  export const footerSchema = z.object({
    text: z.string().max(2048, '2048文字以下である必要があります'),
    icon_url: urlSchema.optional(),
    proxy_icon_url: urlSchema.optional(),
  });

  export const imageSchema = z.object({
    url: urlSchema,
    proxy_url: urlSchema.optional(),
    height: z.number().optional(),
    width: z.number().optional(),
  });

  export const thumbnailSchema = z.object({
    url: urlSchema,
    proxy_url: urlSchema.optional(),
    height: z.number().optional(),
    width: z.number().optional(),
  });

  export const videoSchema = z.object({
    url: urlSchema,
    proxy_url: urlSchema.optional(),
    height: z.number().optional(),
    width: z.number().optional(),
  });

  export const authorSchema = z.object({
    name: z.string().max(256, '256文字以下である必要があります'),
    url: urlSchema.optional(),
    icon_url: urlSchema.optional(),
    proxy_icon_url: urlSchema.optional(),
  });

  export const fieldSchema = z.object({
    name: z.string().max(256, '256文字以下である必要があります'),
    value: z.string().max(1024, '256文字以下である必要があります'),
    inline: z.boolean().optional(),
  });

  export const schema = z
    .object({
      title: z.string().max(256, '256文字以下である必要があります'),
      description: z.string().max(4096, '4096文字以下である必要があります'),
      url: urlSchema,
      timestamp: z
        .string()
        .regex(
          /^\d{4}-?\d\d-?\d\d(?:T\d\d(?::?\d\d(?::?\d\d(?:\.\d+)?)?)?(?:Z|[+-]\d\d:?\d\d)?)?$/,
          '有効なタイムスタンプを入力してください',
        )
        .optional(),
      color: z.number(),
      footer: footerSchema,
      image: imageSchema,
      thumbnail: thumbnailSchema,
      video: videoSchema,
      author: authorSchema,
      fields: z.array(fieldSchema).max(25, '25個以下にする必要があります'),
    })
    .partial();
}

export const messageOptionSchema = z.object({
  content: z.string().max(2000, '2000文字以下である必要があります').default(''),
  embeds: z.array(Embed.schema).max(10, '10個以下である必要があります'),
});
