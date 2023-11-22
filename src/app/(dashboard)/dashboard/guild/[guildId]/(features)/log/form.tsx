'use client';

import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { nullToUndefinedOrValue } from '@/lib/utils';
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
import { Alert, AlertTitle } from '@/components/ui/alert';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['log'] | undefined;
};

const logOptionSchema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channel: z
      .string({ required_error: '選択してください' })
      .regex(/^\d{17,20}$/, '無効なSnowFlakeです。'),
  }),
  z.object({
    enable: z.literal(false),
    channel: z.string().optional(),
  }),
]);

const schema = z.object({
  timeout: logOptionSchema,
  kick: logOptionSchema,
  ban: logOptionSchema,
  voice: logOptionSchema,
  delete: logOptionSchema,
});

export function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      timeout: {
        enable: !!setting?.timeout.enable,
        channel: nullToUndefinedOrValue(setting?.timeout.channel),
      },
      kick: {
        enable: !!setting?.kick.enable,
        channel: nullToUndefinedOrValue(setting?.kick.channel),
      },
      ban: {
        enable: !!setting?.ban.enable,
        channel: nullToUndefinedOrValue(setting?.ban.channel),
      },
      voice: {
        enable: !!setting?.voice.enable,
        channel: nullToUndefinedOrValue(setting?.voice.channel),
      },
      delete: {
        enable: !!setting?.delete.enable,
        channel: nullToUndefinedOrValue(setting?.delete.channel),
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    patchServerSetting(guildId, 'log', values)
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
          <CardTitle>タイムアウト</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='timeout.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <span>タイムアウトログを有効にする</span>
                  <span className='text-default-500'>
                    メンバーをタイムアウトしたり、タイムアウトを手動で解除したりした際にログを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='timeout.channel'
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
                isDisabled={!watch('timeout.enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>キック</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='kick.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <span>キックログを有効にする</span>
                  <span className='text-default-500'>
                    メンバーをキックした際にログを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='kick.channel'
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
                isDisabled={!watch('kick.enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>BAN</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='ban.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <span>BANログを有効にする</span>
                  <span className='text-default-500'>
                    メンバーをBANしたり、BANを解除した際にログを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='ban.channel'
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
                isDisabled={!watch('ban.enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>ボイスチャット</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='voice.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <span>VCログを有効にする</span>
                  <span className='text-default-500'>
                    ボイスチャットの入室や退室、移動があった際にログを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='voice.channel'
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
                isDisabled={!watch('voice.enable')}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>メッセージ削除</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Alert variant='primary'>
            <AlertTitle className='font-normal'>
              💡
              仕様上、BOTが送信したメッセージやNoNICK.jsを導入する前に送信されたメッセージには、削除ログは送信されません。
            </AlertTitle>
          </Alert>
          <Controller
            control={control}
            name='delete.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <span>削除ログを有効にする</span>
                  <span className='text-default-500'>
                    メッセージが削除された際にログを送信します。
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='delete.channel'
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
                isDisabled={!watch('delete.enable')}
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
