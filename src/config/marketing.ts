import { MarketingConfig } from '@/types/config';
import { BsDiscord, BsTwitter } from 'react-icons/bs';

const marketingConfig: MarketingConfig = {
  promo: {
    label: '🎉 ダッシュボードが先行公開されました！',
    href: '/dashboard',
  },
  nav: [
    {
      title: 'Docs',
      href: 'https://docs.nonick-js.com',
    },
  ],
  links: [
    {
      href: 'https://twitter.com/nonick_js',
      icon: BsTwitter,
      alt: 'Twitter',
    },
    {
      href: 'https://discord.gg/6YJFzppp3x',
      icon: BsDiscord,
      alt: 'Discord',
    },
  ],
};

export default marketingConfig;
