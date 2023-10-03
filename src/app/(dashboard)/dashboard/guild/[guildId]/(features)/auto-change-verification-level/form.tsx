'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { ChannelSelect, HourSelect } from '../../selects';
import { APIChannel, ChannelType, GuildVerificationLevel } from 'discord-api-types/v10';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn, nullToUndefinedOrValue } from '@/lib/utils';
import { patchServerSetting } from '@/lib/middleware';
import { useParams } from 'next/navigation';

const schema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    level: z.object({
      old: z.number().min(1).max(4).optional(),
      new: z.coerce.number({ invalid_type_error: '選択してください' }).min(1).max(4),
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
    time: z
      .object({
        start: z.coerce.number({ invalid_type_error: '選択してください' }),
        end: z.coerce.number({ invalid_type_error: '選択してください' }),
      })
      .refine(({ start, end }) => start !== end, {
        path: ['end'],
        message: '開始・終了時間を同じ時間に設定することはできません',
      }),
  }),
  z.object({
    enable: z.literal(false),
    level: z
      .object({
        old: z.number().min(1).max(4),
        new: z.coerce.number().min(1).max(4),
      })
      .partial(),
    log: z
      .object({
        enable: z.boolean(),
        channel: z.string(),
      })
      .partial(),
    time: z
      .object({
        start: z.coerce.number(),
        end: z.coerce.number(),
      })
      .partial(),
  }),
]);

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['changeVerificationLevel'] | undefined;
};

export const SettingForm: FC<Props> = ({ channels, setting }) => {
  const [loading, setLoading] = useState(false);
  const { guildId } = useParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      time: {
        start: nullToUndefinedOrValue(setting?.time.start),
        end: nullToUndefinedOrValue(setting?.time.end),
      },
      level: {
        old: setting?.level.old,
        new: nullToUndefinedOrValue(setting?.level.new) || GuildVerificationLevel.Low,
      },
      log: {
        enable: !!setting?.log.enable,
        channel: nullToUndefinedOrValue(setting?.log.channel),
      },
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    await patchServerSetting(guildId, 'changeVerificationLevel', values)
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
        <Card className='p-6'>
          <FormField
            control={form.control}
            name='enable'
            render={({ field }) => (
              <FormItemLayout title='自動認証レベル変更を有効にする'>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItemLayout>
            )}
          />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>全般設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='time.start'
              render={({ field }) => (
                <FormItemLayout
                  title='開始時間'
                  description='自動変更の開始時間を設定します。'
                  disabled={!form.watch('enable')}
                  required
                >
                  <HourSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value == null ? undefined : String(field.value)}
                    disabled={!form.watch('enable')}
                  />
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='time.end'
              render={({ field }) => (
                <FormItemLayout
                  title='終了時間'
                  description='自動変更の終了時間を設定します。'
                  disabled={!form.watch('enable')}
                  required
                >
                  <HourSelect
                    onValueChange={field.onChange}
                    defaultValue={field.value == null ? undefined : String(field.value)}
                    disabled={!form.watch('enable')}
                  />
                </FormItemLayout>
              )}
            />
            <FormField
              control={form.control}
              name='level.new'
              render={({ field }) => (
                <FormItemLayout
                  title='期間内に変更する認証レベル'
                  layout='col'
                  disabled={!form.watch('enable')}
                  required
                >
                  <FormControl>
                    <RadioGroup
                      className='px-3'
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                      disabled={!form.watch('enable')}
                    >
                      <FormControl>
                        <FormItem className='flex items-center gap-3 space-y-0'>
                          <RadioGroupItem value={String(GuildVerificationLevel.Low)} />
                          <div className={cn({ 'opacity-50': !form.watch('enable') })}>
                            <FormLabel className='text-green-500'>低</FormLabel>
                            <FormDescription>メール認証がされているアカウントのみ</FormDescription>
                          </div>
                        </FormItem>
                      </FormControl>
                      <FormControl>
                        <FormItem className='flex items-center gap-3 space-y-0'>
                          <RadioGroupItem value={String(GuildVerificationLevel.Medium)} />
                          <div className={cn({ 'opacity-50': !form.watch('enable') })}>
                            <FormLabel className='text-yellow-500'>中</FormLabel>
                            <FormDescription>
                              Discordに登録してから5分以上経過したアカウントのみ
                            </FormDescription>
                          </div>
                        </FormItem>
                      </FormControl>
                      <FormControl>
                        <FormItem className='flex items-center gap-3 space-y-0'>
                          <RadioGroupItem value={String(GuildVerificationLevel.High)} />
                          <div className={cn({ 'opacity-50': !form.watch('enable') })}>
                            <FormLabel className='text-orange-500'>高</FormLabel>
                            <FormDescription>
                              このサーバーのメンバーとなってから10分以上経過したアカウントのみ
                            </FormDescription>
                          </div>
                        </FormItem>
                      </FormControl>
                      <FormControl>
                        <FormItem className='flex items-center gap-3 space-y-0'>
                          <RadioGroupItem value={String(GuildVerificationLevel.VeryHigh)} />
                          <div className={cn({ 'opacity-50': !form.watch('enable') })}>
                            <FormLabel className='text-red-500'>最高</FormLabel>
                            <FormDescription>電話認証がされているアカウントのみ</FormDescription>
                          </div>
                        </FormItem>
                      </FormControl>
                    </RadioGroup>
                  </FormControl>
                </FormItemLayout>
              )}
            />
          </CardContent>
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
                  description='有効にすると、自動変更の開始・終了時にログを送信します。'
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
                  description='自動変更ログの送信先を設定します。'
                  disabled={!form.watch('enable') || !form.watch('log.enable')}
                  required
                >
                  <ChannelSelect
                    channels={channels}
                    types={[ChannelType.GuildText]}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('enable') || !form.watch('log.enable')}
                    isShowCategoryName
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
