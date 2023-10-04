'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { ChannelSelect, RoleSelect } from '../../selects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { useParams } from 'next/navigation';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { IServerSettings } from '@/models/settingModel';
import { nullToUndefinedOrValue } from '@/lib/utils';

type Props = {
  channels: APIChannel[];
  roles: APIRole[];
  setting: IServerSettings['report'] | undefined;
};

const schema = z.object({
  channel: z.string({ required_error: '選択してください' }),
  mention: z.discriminatedUnion('enable', [
    z.object({
      enable: z.literal(true),
      role: z.string({ required_error: '選択してください' }),
    }),
    z.object({
      enable: z.literal(false),
      role: z.string().optional(),
    }),
  ]),
});

export const SettingForm: FC<Props> = ({ channels, roles, setting }) => {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      channel: setting?.channel,
      mention: {
        enable: !!setting?.mention.enable,
        role: nullToUndefinedOrValue(setting?.mention?.role),
      },
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    await patchServerSetting(guildId, 'report', values)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>全般設定</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name='channel'
              render={({ field }) => (
                <FormItemLayout
                  title='通報の送信先'
                  description='メンバーが送信した通報がこのチャンネルに送られます。'
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    isShowCategoryName
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='mention.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='メンション通知を有効にする'
                  description='通報が送られた際に特定のロールをメンションします。'
                >
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='mention.role'
              render={({ field }) => (
                <FormItemLayout
                  title='ロール'
                  description='通報が送られた際にこのロールをメンションします。'
                  disabled={!form.watch('mention.enable')}
                  required
                >
                  <RoleSelect
                    roles={roles}
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    disabled={!form.watch('mention.enable')}
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <SubmitButton disabled={loading} />
      </form>
    </Form>
  );
};
