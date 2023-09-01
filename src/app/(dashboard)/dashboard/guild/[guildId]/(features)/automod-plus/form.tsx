'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/schemas/ServerSettings';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { ChannelSelect } from '../../selects';

type Props = {
  channels: APIChannel[],
  setting: IServerSettings['autoMod'] | undefined,
}

const schema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    filter: z.object({
      inviteUrl: z.boolean(),
      token: z.boolean(),
      shortUrl: z.boolean(),
    }),
    ignore: z.object({
      channels: z.array(z.string()),
      roles: z.array(z.string()),
    }),
    log: z.discriminatedUnion('enable', [
      z.object({
        enable: z.literal(true),
        channel: z.string({ required_error: '選択してください' }),
      }),
      z.object({
        enable: z.literal(false),
        channel: z.string().optional(),
      }),
    ]),
  }),
  z.object({
    enable: z.literal(false),
    filter: z.object({
      inviteUrl: z.boolean(),
      token: z.boolean(),
      shortUrl: z.boolean(),
    }).partial(),
    ignore: z.object({
      channels: z.array(z.string()),
      roles: z.array(z.string()),
    }).partial(),
    log: z.object({
      enable: z.boolean(),
      channel: z.string(),
    }).partial(),
  })
]);

export const SettingForm: FC<Props> = ({ channels, setting }) => {
  const { toast } = useToast();
  const [ loading, setLoading ] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      filter: {
        inviteUrl: !!setting?.filter.inviteUrl,
        token: !!setting?.filter.token,
        shortUrl: !!setting?.filter.shortUrl,
      },
      ignore: {
        channels: setting?.ignore.channels,
        roles: setting?.ignore.roles,
      },
      log: {
        enable: !!setting?.log.enable,
        channel: setting?.log.channel,
      },
    }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-zinc-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6'>
        <Card className='p-6'>
          <FormField
            control={form.control}
            name='enable'
            render={({ field }) => (
              <FormItemLayout title='AutoMod Plusを有効にする'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItemLayout>
            )}
          />  
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ログ設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='log.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='ログ機能を有効にする'
                  description='有効にすると、メッセージがブロックされた際にログを送信します。'
                  disabled={!form.watch('enable')}
                >
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!form.watch('enable')}
                    />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='log.channel'
              render={({ field }) => (
                <FormItemLayout
                  title='チャンネル'
                  description='AutoModログの送信先を変更します。'
                  disabled={!form.watch('enable') || !form.watch('log.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={!form.watch('enable') || !form.watch('log.enable')}
                    isShowCategoryName
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <SubmitButton disabled={loading}/>
      </form>
    </Form>
  );
}