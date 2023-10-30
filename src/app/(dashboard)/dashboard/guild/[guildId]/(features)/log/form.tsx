'use client';

import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/models/settingModel';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nullToUndefinedOrValue } from '@/lib/utils';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FormField, FormControl, Form } from '@/components/ui/form';
import { InfoIcon } from 'lucide-react';
import { FormItemLayout, SubmitButton } from '../../components/form';
import { ChannelSelect } from '../../components/select';
import { Switch } from '@/components/ui/switch';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['log'] | undefined;
};

const logCategoryOptionsSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z.string({ required_error: '選択してください' }),
  }),
  z.object({
    enable: z.literal(false),
    channel: z.string().optional(),
  }),
]);

const schema = z.object({
  timeout: logCategoryOptionsSchema,
  kick: logCategoryOptionsSchema,
  ban: logCategoryOptionsSchema,
  voice: logCategoryOptionsSchema,
  delete: logCategoryOptionsSchema,
});

export default function SettingForm({ channels, setting }: Props) {
  const [loading, setLoading] = useState(false);
  const { guildId }: { guildId: string } = useParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      timeout: {
        enable: !!setting?.timeout.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
      kick: {
        enable: !!setting?.kick.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
      ban: {
        enable: !!setting?.ban.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
      voice: {
        enable: !!setting?.voice.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
      delete: {
        enable: !!setting?.delete.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    await patchServerSetting(guildId, 'log', values)
      .then(() => toast({ title: '設定を保存しました！' }))
      .catch(() =>
        toast({
          title: '設定の保存に失敗しました',
          description: '時間をおいて再試行してください。',
          variant: 'destructive',
        }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6'>
        <Card>
          <CardHeader>
            <CardTitle>タイムアウト</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='timeout.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='タイムアウトログを有効にする'
                  description='メンバーをタイムアウトしたり、タイムアウトを手動で解除したりした際にログを送信します。'
                >
                  <FormControl>
                    <Switch onCheckedChange={field.onChange} checked={field.value} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='timeout.channel'
              render={({ field }) => (
                <FormItemLayout
                  title='チャンネル'
                  disabled={!form.watch('timeout.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('timeout.enable')}
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>キック</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='kick.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='キックログを有効にする'
                  description='メンバーをキックした際にログを送信します。'
                >
                  <FormControl>
                    <Switch onCheckedChange={field.onChange} checked={field.value} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='kick.channel'
              render={({ field }) => (
                <FormItemLayout title='チャンネル' disabled={!form.watch('kick.enable')} required>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('kick.enable')}
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BAN</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='ban.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='BANログを有効にする'
                  description='メンバーをBANしたり、BANを解除した際にログを送信します。'
                >
                  <FormControl>
                    <Switch onCheckedChange={field.onChange} checked={field.value} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='ban.channel'
              render={({ field }) => (
                <FormItemLayout title='チャンネル' disabled={!form.watch('ban.enable')} required>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('ban.enable')}
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ボイスチャット</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='voice.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='VCログを有効にする'
                  description='ボイスチャットの入室や退室、移動があった際にログを送信します。'
                >
                  <FormControl>
                    <Switch onCheckedChange={field.onChange} checked={field.value} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='voice.channel'
              render={({ field }) => (
                <FormItemLayout title='チャンネル' disabled={!form.watch('voice.enable')} required>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('voice.enable')}
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>メッセージ削除</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='delete.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='削除ログを有効にする'
                  description='メッセージが削除された際にログを送信します。'
                >
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='delete.channel'
              render={({ field }) => (
                <FormItemLayout title='チャンネル' disabled={!form.watch('delete.enable')} required>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={!form.watch('delete.enable')}
                  />
                </FormItemLayout>
              )}
            />
            {form.watch('delete.enable') && (
              <Alert className='items-center' variant='primary'>
                <InfoIcon size={18} />
                <AlertTitle>一部のメッセージは削除してもログが送信されません</AlertTitle>
                <AlertDescription>
                  仕様上、BOTが送信したメッセージやNoNICK.jsを導入する前に送信されたメッセージには、削除ログは送信されません。
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        <SubmitButton disabled={loading} />
      </form>
    </Form>
  );
}
