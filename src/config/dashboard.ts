import { DashboardConfig } from '@/types/config';
import {
  ClipboardList,
  Flag,
  HashtagChat,
  LinkRound,
  ListCheck,
  Mailbox,
  Settings,
  ShieldCheck,
  Sledgehammer,
  UsersGroupRounded,
  Widget5,
} from 'solar-icon-set';

const dashboardConfig: DashboardConfig = {
  sidebar: [
    {
      items: [
        {
          label: 'ダッシュボード',
          icon: Widget5,
          href: '/',
        },
        {
          label: '監査ログ',
          icon: ListCheck,
          href: '/audit-log',
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
          icon: UsersGroupRounded,
          href: '/join-and-leave-message',
        },
        {
          label: 'サーバー内通報',
          icon: Flag,
          href: '/report',
        },
        {
          label: 'イベントログ',
          icon: ClipboardList,
          href: '/log',
        },
        {
          label: 'メッセージURL展開',
          icon: LinkRound,
          href: '/message-expansion',
        },
        {
          label: '自動認証レベル変更',
          icon: ShieldCheck,
          href: '/auto-change-verification-level',
        },
        {
          label: '自動アナウンス公開',
          icon: Mailbox,
          href: '/auto-public',
        },
        {
          label: '自動スレッド作成',
          icon: HashtagChat,
          href: '/auto-create-thread',
          badge: 'New',
        },
        {
          label: 'AutoMod Plus',
          icon: Sledgehammer,
          href: '/automod-plus',
        },
      ],
    },
  ],
};

export default dashboardConfig;
