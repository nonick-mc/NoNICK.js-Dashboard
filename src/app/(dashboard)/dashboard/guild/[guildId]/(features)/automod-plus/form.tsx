'use client';

import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { SubmitButton } from '../../submit-button';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { Card, CardBody, CardHeader, Switch, cn } from '@nextui-org/react';
import { selectClassNames, switchClassNames } from '../../classnames';
import { nullToUndefinedOrValue } from '@/lib/utils';
import { CardTitle } from '../../header';
import { ChannelSelect } from '../../channel-select';
import { RoleSelect } from '../../role-select';
import { Alert, AlertTitle } from '@/components/ui/alert';

type Props = {
  channels: APIChannel[];
  roles: APIRole[];
  setting: IServerSettings['autoMod'] | undefined;
};

const schema = z.object({
  enable: z.boolean(),
  log: z.discriminatedUnion('enable', [
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
  ]),
  filter: z.object({
    inviteUrl: z.boolean(),
    token: z.boolean(),
    shortUrl: z.boolean(),
  }),
  ignore: z.object({
    channels: z.array(z.string().regex(/^\d{17,20}$/, '無効なSnowFlakeです。')),
    roles: z.array(z.string().regex(/^\d{17,20}$/, '無効なSnowFlakeです。')),
  }),
});

export function Form({ channels, roles, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      log: {
        enable: !!setting?.log.enable,
        channel: nullToUndefinedOrValue(setting?.log.channel),
      },
      filter: {
        inviteUrl: !!setting?.filter.inviteUrl,
        token: !!setting?.filter.token,
        shortUrl: !!setting?.filter.shortUrl,
      },
      ignore: {
        channels: setting?.ignore.channels || [],
        roles: setting?.ignore.roles || [],
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    patchServerSetting(guildId, 'autoMod', values)
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
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
              >
                <span>AutoMod Plusを有効にする</span>
              </Switch>
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>フィルター設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='filter.inviteUrl'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
                isDisabled={!watch('enable')}
              >
                <div className='flex flex-col'>
                  <span>招待リンク</span>
                  <span className='text-default-500'>
                    このサーバー以外のDiscordサーバーの招待リンク
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='filter.token'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
                isDisabled={!watch('enable')}
              >
                <div className='flex flex-col'>
                  <span>トークン</span>
                  <span className='text-default-500'>
                    Discordのログイントークン、OAuthシークレット
                  </span>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='filter.shortUrl'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
                isDisabled={!watch('enable')}
              >
                <div className='flex flex-col'>
                  <span>短縮URL</span>
                  <span className='text-default-500'>
                    よく使われている短縮URLサービスのドメインを含むURL
                  </span>
                </div>
              </Switch>
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>例外設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Alert className={cn({ 'opacity-disabled': !watch('enable') })} variant='primary'>
            <AlertTitle className='text-sm font-normal'>
              💡 「サーバーの管理」権限を持つユーザーは、常時フィルターから除外されます。
            </AlertTitle>
          </Alert>
          <div className='flex flex-col gap-3'>
            <Controller
              control={control}
              name='ignore.channels'
              render={({ field, fieldState: { error } }) => (
                <ChannelSelect
                  label='フィルターを適用しないチャンネル'
                  classNames={{ trigger: 'min-h-unit-12' }}
                  channels={channels}
                  filter={(channel) =>
                    ![ChannelType.GuildDirectory, ChannelType.GuildCategory].includes(channel.type)
                  }
                  onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                  defaultSelectedKeys={field.value}
                  errorMessage={error?.message}
                  isInvalid={!!error}
                  isDisabled={!watch('enable')}
                  isMultiline
                />
              )}
            />
            <Controller
              control={control}
              name='ignore.roles'
              render={({ field, fieldState: { error } }) => (
                <RoleSelect
                  label='フィルターを適用しないロール'
                  classNames={{ trigger: 'min-h-unit-12' }}
                  roles={roles}
                  filter={(role) => role.id !== guildId}
                  onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                  defaultSelectedKeys={field.value}
                  errorMessage={error?.message}
                  isInvalid={!!error}
                  isDisabled={!watch('enable')}
                  isMultiline
                />
              )}
            />
          </div>
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
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultSelected={field.value}
                isDisabled={!watch('enable')}
              >
                <div className='flex flex-col'>
                  <span>ログを有効にする</span>
                  <span className='text-default-500'>
                    フィルターでメッセージがブロックされた際にログを送信します。
                  </span>
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
                isDisabled={!watch('enable') || !watch('log.enable')}
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
