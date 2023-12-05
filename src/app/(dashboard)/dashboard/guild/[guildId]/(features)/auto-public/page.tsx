import { Metadata } from 'next';
import { Header } from '../../header';
import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Form } from './form';

export const metadata: Metadata = {
  title: '自動アナウンス公開',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'autoPublic');

  return (
    <>
      <Header
        title='自動アナウンス公開'
        description='アナウンスチャンネルに投稿されたメッセージを自動で公開します。'
      />
      <Form
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}
