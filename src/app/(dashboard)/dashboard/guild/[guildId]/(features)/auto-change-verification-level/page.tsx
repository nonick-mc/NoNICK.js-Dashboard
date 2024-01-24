import { AutomationSetting } from '@/database/models';
import { getChannels } from '@/lib/discord';
import { convertPlainObject } from '@/lib/utils';
import { Metadata } from 'next';
import { Header } from '../../header';
import Form from './form';

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
