import { Metadata } from 'next';
import { Header } from '../../header';
import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Form } from './form';

export const metadata: Metadata = {
  title: 'イベントログ',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'log');

  return (
    <>
      <Header
        title='イベントログ'
        description='サーバー内での特定アクションのログを送信します。'
      />
      <Form
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}
