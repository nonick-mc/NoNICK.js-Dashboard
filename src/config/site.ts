import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  metadata: {
    name: 'NoNICK.js',
    description: 'Discordサーバーの管理をサポートする多機能BOT',
    url: new URL(
      process.env.NEXT_PUBLIC_VERCEL_URL || `http://localhost:${process.env.PORT || '3000'}`,
    ),
  },
};
