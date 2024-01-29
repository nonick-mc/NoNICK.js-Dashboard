import { AutomationSetting } from '@/database/models';
import { getChannels } from '@/lib/discord';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '../../header';
import LoadingPage from '../../loading';
import { convertPlainObject } from '../../utils';

const Form = dynamic(() => import('./form'), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export const metadata: Metadata = {
  title: '自動認証レベル変更',
};

export default async function Page({
  params: { guildId },
}: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const setting = await AutomationSetting.findOne({ serverId: guildId });

  return (
    <>
      <Header
        title='自動認証レベル変更'
        description='特定の時間帯に自動で認証レベルを変更します。'
      />
      <Form
        channels={channels}
        setting={convertPlainObject(setting?.memberVerify)}
      />
    </>
  );
}
