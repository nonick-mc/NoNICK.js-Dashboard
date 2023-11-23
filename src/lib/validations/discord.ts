import * as z from 'zod';

export const messageOptions = z.object({
  content: z.string().max(2048, 'メッセージが長過ぎます。').optional(),
  embeds: z.array(z.object({
    title: z.string().max(256, '').optional(),
    description: z.string().max(4096, '').optional(),
    url: z.string().url('URLである必要があります').optional(),
    color: z.number().min(0x000000).max(0xFFFFFF).optional(),
    footer: z.object({
      text: z.string().max(2048, ''),
      icon_url: z.string().url('URLである必要があります').optional(),
    }).optional(),
    image: z.object({
      icon_url: z.string().url('URLである必要があります'),
    }).optional(),
    thumbnail: z.object({
      icon_url: z.string().url('URLである必要があります'),
    }).optional(),
    author: z.object({
      name: z.string().max(256, ''),
      url: z.string().url('URLである必要があります').optional(),
      icon_url: z.string().url('URLである必要があります').optional(),
    }).optional(),
    fields: z.array(z.object({
      name: z.string().max(256),
      value: z.string().max(1024),
      inline: z.boolean().default(false),
    })).max(25, '').optional(),
  })),
});
