import { MarketingConfig } from '@/types/config';
import { SiX, SiDiscord } from '@icons-pack/react-simple-icons';

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
      icon: SiX,
    },
    {
      href: 'https://discord.gg/6YJFzppp3x',
      icon: SiDiscord,
    },
  ],
};

export default marketingConfig;
