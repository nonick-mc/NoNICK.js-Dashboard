'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { ChannelSelect } from '../../selects';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Props = {
  channels: APIChannel[];
};

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

export const SettingForm: FC<Props> = ({ channels }) => {
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
                  description='有効にすると、BOTに関する重要な情報やアップデート内容についてのメッセージを受け取ります。'
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
                <FormItemLayout
                  title='チャンネル'
                  description='お知らせの送信先を設定します。'
                  required
                  disabled
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    isShowCategoryName
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
              <Badge variant='secondary'>Alpha</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='lang'
              render={({ field }) => (
                <FormItemLayout
                  title='NoNICK.jsの言語'
                  description='このサーバーでの使用言語を設定します。'
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
};
