'use client';

import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { nullToUndefinedOrValue } from '@/lib/utils';
import { messageOptions } from '@/lib/validations';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { CardTitle } from '../../header';
import { selectClassNames, switchClassNames } from '../../classnames';
import { ChannelSelect } from '../../channel-select';
import { SubmitButton } from '../../submit-button';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['message'] | undefined;
};

const LogSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z
      .string({ required_error: '選択してください' })
      .regex(/^\d{17,20}$/, '無効なSnowFlakeです。'),
    messageOptions,
  }),
  z.object({
    enable: z.literal(false),
    channel: z.string().optional(),
    messageOptions: messageOptions.optional(),
  }),
]);

const schema = z.object({
  join: LogSchema,
  leave: LogSchema,
});

export function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      join: {
        enable: !!setting?.join.enable,
        channel: nullToUndefinedOrValue(setting?.join.channel),
        messageOptions: setting?.join.messageOptions,
      },
      leave: {
        enable: !!setting?.leave.enable,
        channel: nullToUndefinedOrValue(setting?.leave.channel),
        messageOptions: setting?.leave.messageOptions,
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    patchServerSetting(guildId, 'message', { ...setting, ...values })
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
        <CardHeader className='p-6'>
          <CardTitle>入室メッセージ</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='join.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
              >
                <div className='flex flex-col'>
                  <span>入室メッセージを有効にする</span>
                  <span className='text-default-500'>
                    メンバーがサーバーに参加した際にメッセージを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='join.channel'
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
                isDisabled={!watch('join.enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>退室メッセージ</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='join.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
              >
                <div className='flex flex-col'>
                  <span>退室メッセージを有効にする</span>
                  <span className='text-default-500'>
                    メンバーがサーバーに退室した際にメッセージを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='join.channel'
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
                isDisabled={!watch('join.enable')}
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
