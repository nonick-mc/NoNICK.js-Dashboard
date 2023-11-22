'use client';

import * as z from 'zod';
import { IServerSettings } from '@/models/settingModel';
import { APIChannel, ChannelType, GuildVerificationLevel } from 'discord-api-types/v10';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { nullToUndefinedOrValue, zeroPadding } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '../../submit-button';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { Card, CardBody, CardHeader, Radio, RadioGroup, Switch, cn } from '@nextui-org/react';
import { CardTitle } from '../../header';
import { ChannelSelect } from '../../channel-select';
import { NumberSelect } from '../../number-select';
import { selectClassNames } from '../../classnames';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['changeVerificationLevel'] | undefined;
};

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

export function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
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
    setIsLoading(true);
    patchServerSetting(guildId, 'changeVerificationLevel', values)
      .then(() => toast({ title: '設定を保存しました！' }))
      .catch(() =>
        toast({
          title: '設定の保存に失敗しました',
          description: '時間をおいて再試行してください。',
          variant: 'destructive',
        }),
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 pb-6'>
      <Card>
        <CardBody className='p-6'>
          <Controller
            control={control}
            name='enable'
            render={({ field }) => (
              <Switch
                classNames={{
                  base: 'max-w-none flex-row-reverse justify-between gap-3',
                  label: 'text-sm',
                }}
                onChange={field.onChange}
                defaultSelected={field.value}
              >
                <p>自動認証レベル変更を有効にする</p>
              </Switch>
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>全般設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <div className='flex flex-col gap-3'>
            <Controller
              control={control}
              name='time.start'
              render={({ field, fieldState: { error } }) => (
                <NumberSelect
                  classNames={selectClassNames}
                  label='開始時間'
                  labelPlacement='outside-left'
                  length={24}
                  textFormat={(value) => `${zeroPadding(value, 2)}:00`}
                  onChange={field.onChange}
                  defaultSelectedKeys={field.value ? [String(field.value)] : []}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  isDisabled={!watch('enable')}
                  isRequired
                />
              )}
            />
            <Controller
              control={control}
              name='time.end'
              render={({ field, fieldState: { error } }) => (
                <NumberSelect
                  classNames={selectClassNames}
                  label='終了時間'
                  labelPlacement='outside-left'
                  length={24}
                  textFormat={(value) => `${zeroPadding(value, 2)}:00`}
                  onChange={field.onChange}
                  defaultSelectedKeys={field.value ? [String(field.value)] : []}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  isDisabled={!watch('enable')}
                  isRequired
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name='level.new'
            render={({ field }) => (
              <RadioGroup
                classNames={{
                  label: cn('text-sm text-foreground', { 'opacity-disabled': !watch('enable') }),
                }}
                label='期間内に設定する認証レベル'
                onChange={(e) => field.onChange(e.target.value)}
                defaultValue={`${field.value}`}
                isDisabled={!watch('enable')}
                isRequired
              >
                <Radio
                  classNames={{ label: 'text-green-500' }}
                  value={`${GuildVerificationLevel.Low}`}
                  description='メール認証がされているアカウントのみ'
                >
                  低
                </Radio>
                <Radio
                  classNames={{ label: 'text-yellow-500' }}
                  value={`${GuildVerificationLevel.Medium}`}
                  description='Discordに登録してから5分以上経過したアカウントのみ'
                >
                  中
                </Radio>
                <Radio
                  classNames={{ label: 'text-orange-500' }}
                  value={`${GuildVerificationLevel.High}`}
                  description='このサーバーのメンバーとなってから10分以上経過したアカウントのみ'
                >
                  高
                </Radio>
                <Radio
                  classNames={{ label: 'text-red-500' }}
                  value={`${GuildVerificationLevel.VeryHigh}`}
                  description='電話認証がされているアカウントのみ'
                >
                  最高
                </Radio>
              </RadioGroup>
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>ログ設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='log.enable'
            render={({ field }) => (
              <Switch
                classNames={{
                  base: 'max-w-none flex-row-reverse justify-between gap-3',
                  label: 'text-sm',
                }}
                onChange={field.onChange}
                defaultSelected={field.value}
                isDisabled={!watch('enable')}
              >
                <div className='flex flex-col'>
                  <p>ログ機能を有効にする</p>
                  <p className='text-default-500'>自動変更の開始・終了時にログを送信します。</p>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='log.channel'
            render={({ field, fieldState: { error } }) => (
              <ChannelSelect
                classNames={selectClassNames}
                label='チャンネル'
                labelPlacement='outside-left'
                channels={channels}
                filter={(channel) => channel.type === ChannelType.GuildText}
                onChange={field.onChange}
                defaultSelectedKeys={field.value ? [field.value] : []}
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={!watch('log.enable') || !watch('enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <SubmitButton loading={isLoading} />
    </form>
  );
}
