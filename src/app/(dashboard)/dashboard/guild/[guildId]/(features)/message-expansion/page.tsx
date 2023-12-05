import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Metadata } from 'next';
import { Header } from '../../header';
import { Form } from './form';

export const metadata: Metadata = {
  title: 'メッセージURL展開',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'message');

  return (
    <>
      <Header
        title='メッセージURL展開'
        description='送信されたDiscordのメッセージURLの内容を送信します。'
      />
      <Form
        channels={channels}
        setting={
          setting?.expansion
            ? JSON.parse(JSON.stringify(setting.expansion))
            : undefined
        }
      />
    </>
  );
}
