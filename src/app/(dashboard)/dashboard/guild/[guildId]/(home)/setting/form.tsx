'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout } from '../../components/form';
import { Switch } from '@/components/ui/switch';
import { ChannelSelect } from '../../components/select';
import { Badge } from '@/components/ui/badge';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({
  announce: z.discriminatedUnion('enable', [
    z.object({
      enable: z.literal(true),
      channel: z.string({ required_error: '選択してください' }),
    }),
    z.object({
      enable: z.literal(false),
      channel: z.string().optional(),
    }),
  ]),
  lang: z.string(),
});

export default function SettingForm({ channels }: { channels: APIChannel[] }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      announce: {
        enable: false,
        channel: undefined,
      },
      lang: 'ja',
    },
  });

  return (
    <Form {...form}>
      <form className='space-y-6 pb-6'>
        <Card>
          <CardHeader>
            <CardTitle>お知らせ設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='announce.enable'
              render={({ field }) => (
                <FormItemLayout
                  title='運営からのお知らせを有効にする'
                  description='BOTに関する重要情報、アップデート内容'
                  disabled
                >
                  <FormControl>
                    <Switch onCheckedChange={field.onChange} checked={field.value} disabled />
                  </FormControl>
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='announce.channel'
              render={({ field }) => (
                <FormItemLayout title='チャンネル' required disabled>
                  <ChannelSelect
                    channels={channels}
                    filter={(channel) => channel.type === ChannelType.GuildText}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled
                  />
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              言語設定
              <Badge variant='secondary'>ベータ</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='lang'
              render={({ field }) => (
                <FormItemLayout
                  title='NoNICK.jsの言語'
                  description='各機能やコマンドで使用される言語'
                  disabled
                >
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                    <SelectTrigger className='w-[300px]'>
                      <SelectValue placeholder='言語を選択' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='ja'>日本語 (Japanese)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <Button disabled>変更を保存</Button>
      </form>
    </Form>
  );
}
