import { Metadata } from 'next';
import { Header } from '../../header';
import { Form } from './form';
import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';

export const metadata: Metadata = {
  title: '入退室メッセージ',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'message');
  return (
    <>
      <Header
        title='入退室メッセージ'
        description='メンバーがサーバーに参加したり脱退したりした際にメッセージを送信します。'
      />
      <Form
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}
