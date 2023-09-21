import { MarketingConfig } from '@/types';
import { BsDiscord, BsTwitter } from 'react-icons/bs';

export const marketingConfig: MarketingConfig = {
  alert: {
    visible: true,
    label: '🎉 ダッシュボードが先行公開されました！',
    href: '/dashboard',
  },
  mainNav: [
    {
      title: 'Docs',
      href: 'https://docs.nonick-js.com',
    },
    {
      title: 'Blog',
      href: '/blog',
      disabled: true,
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
    {
      title: 'Beta',
      href: '/beta',
      disabled: true,
    },
  ],
  links: [
    {
      href: 'https://twitter.com/nonick_js',
      icon: BsTwitter,
    },
    {
      href: 'https://discord.gg/6YJFzppp3x',
      icon: BsDiscord,
    },
  ],
  invite: process.env.NEXT_PUBLIC_BOT_INVITE_URL || '#',
};
