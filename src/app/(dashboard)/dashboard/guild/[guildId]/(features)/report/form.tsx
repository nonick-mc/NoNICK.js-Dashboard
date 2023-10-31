'use client';

import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { nullToUndefinedOrValue } from '@/lib/utils';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormItemLayout, SubmitButton } from '../../_components/form';
import { ChannelSelect, RoleSelect } from '../../_components/select';
import { Switch } from '@/components/ui/switch';

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

export default function SettingForm({ channels, roles, setting }: Props) {
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

  function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    patchServerSetting(guildId, 'report', values)
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
          <CardContent className='space-y-4 pt-6'>
            <FormField
              control={form.control}
              name='channel'
              render={({ field }) => (
                <FormItemLayout title='通報を受け取るチャンネル' required>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
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
                <FormItemLayout title='ロール' disabled={!form.watch('mention.enable')} required>
                  <RoleSelect
                    roles={roles}
                    filter={(role) => !role.managed}
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
}
