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
    },
    {
      title: 'Support',
      href: '/support',
    },
    {
      title: 'Beta',
      href: '/beta',
    }
  ],
  links: [
    {
      href: 'https://twitter.com/nonick_js',
      icon: BsTwitter,
    },
    {
      href: 'https://discord.gg/fVcjCNn733',
      icon: BsDiscord,
    },
  ],
  invite: 'https://discord.com/api/oauth2/authorize?client_id=956688181787512833&permissions=0&scope=bot%20applications.commands',
}