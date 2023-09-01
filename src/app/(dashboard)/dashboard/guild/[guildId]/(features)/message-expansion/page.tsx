import { getServerSetting } from '@/lib/mongoose';
import { Header, Shell } from '../../formats';
import { SettingForm } from './form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メッセージURL展開',
}

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  // const setting = await getServerSetting(guildId, 'message');

  return (
    <Shell>
      <Header title='メッセージURL展開' description='送信されたメッセージURLの内容を送信します。'/>
      {/* <SettingForm
        setting={setting?.expansion ? JSON.parse(JSON.stringify(setting?.expansion)) : undefined}
      /> */}
    </Shell>
  )
}