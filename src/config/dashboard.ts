import { DashboardConfig } from '@/types/config';
import {
  CheckSquare,
  File,
  Flag,
  LayoutGrid,
  Link,
  Megaphone,
  Settings,
  Shield,
  Users,
} from 'lucide-react';

const dashboardConfig: DashboardConfig = {
  sidebar: [
    {
      items: [
        {
          label: 'ダッシュボード',
          icon: LayoutGrid,
          href: '/',
        },
        {
          label: '設定',
          icon: Settings,
          href: '/setting',
        },
      ],
    },
    {
      label: '機能',
      items: [
        {
          label: '入退室メッセージ',
          icon: Users,
          href: '/join-and-leave-message',
          badge: '🚧',
        },
        {
          label: 'サーバー内通報',
          icon: Flag,
          href: '/report',
        },
        {
          label: 'イベントログ',
          icon: File,
          href: '/log',
        },
        {
          label: 'メッセージURL展開',
          icon: Link,
          href: '/message-expansion',
          badge: '🚧',
        },
        {
          label: '自動認証レベル変更',
          icon: CheckSquare,
          href: '/auto-change-verification-level',
        },
        {
          label: '自動アナウンス公開',
          icon: Megaphone,
          href: '/auto-public',
        },
        {
          label: 'AutoMod Plus',
          icon: Shield,
          href: '/automod-plus',
          badge: '🚧',
        },
      ],
    },
  ],
};

export default dashboardConfig;
