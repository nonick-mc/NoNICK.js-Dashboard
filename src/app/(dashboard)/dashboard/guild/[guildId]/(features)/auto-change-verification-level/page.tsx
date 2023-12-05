import { getChannels } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Metadata } from 'next';
import { Header } from '../../header';
import { Form } from './form';

export const metadata: Metadata = {
  title: '自動認証レベル変更',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await getServerSetting(guildId, 'changeVerificationLevel');

  return (
    <>
      <Header
        title='自動認証レベル変更'
        description='サーバーの認証レベルを特定の時間帯だけ自動で変更します。'
      />
      <Form
        channels={channels}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}
