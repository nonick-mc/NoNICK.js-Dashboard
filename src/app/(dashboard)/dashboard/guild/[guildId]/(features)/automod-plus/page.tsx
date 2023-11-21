import { Metadata } from 'next';
import { Header } from '../../header';
import { getChannels, getRoles } from '@/lib/discord';
import { getServerSetting } from '@/lib/mongoose/middleware';
import { Form } from './form';

export const metadata: Metadata = {
  title: 'AutoMod Plus',
};

export default async function Page({ params: { guildId } }: { params: { guildId: string } }) {
  const channels = await getChannels(guildId);
  const roles = await getRoles(guildId);
  const setting = await getServerSetting(guildId, 'autoMod');

  return (
    <>
      <Header
        title='AutoMod Plus'
        description='特定のフィルターに検知されたメッセージをブロックします。'
      />
      <Form
        channels={channels}
        roles={roles}
        setting={setting ? JSON.parse(JSON.stringify(setting)) : undefined}
      />
    </>
  );
}
