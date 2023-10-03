'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { ChannelSelect } from '../../selects';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/middleware';
import { useParams } from 'next/navigation';
import { nullToUndefinedOrValue } from '@/lib/utils';

const logSettingsSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z.string({ required_error: '選択してください' }),
  }),
  z.object({
    enable: z.literal(false),
    channel: z.string().optional(),
  }),
]);

const formSchema = z.object({
  timeout: logSettingsSchema,
  kick: logSettingsSchema,
  ban: logSettingsSchema,
  voice: logSettingsSchema,
  delete: logSettingsSchema,
});

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['log'] | undefined;
};

export const SettingForm: FC<Props> = ({ channels, setting }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { guildId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await patchServerSetting(guildId, 'log', values)
      .then(() => toast({ title: '設定を保存しました！' }))
      .catch(() =>
        toast({
          title: '設定の保存に失敗しました。',
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
                  description='このチャンネルにログが送信されます。'
                  disabled={!form.watch('timeout.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('timeout.enable')}
                    isShowCategoryName
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
                <FormItemLayout
                  title='チャンネル'
                  description='このチャンネルにログが送信されます。'
                  disabled={!form.watch('kick.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('kick.enable')}
                    isShowCategoryName
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
                <FormItemLayout
                  title='チャンネル'
                  description='このチャンネルにログが送信されます。'
                  disabled={!form.watch('ban.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('ban.enable')}
                    isShowCategoryName
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
                <FormItemLayout
                  title='チャンネル'
                  description='このチャンネルにログが送信されます。'
                  disabled={!form.watch('voice.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('voice.enable')}
                    isShowCategoryName
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
                <FormItemLayout
                  title='チャンネル'
                  description='このチャンネルにログが送信されます。'
                  disabled={!form.watch('delete.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={!form.watch('delete.enable')}
                    isShowCategoryName
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
};
