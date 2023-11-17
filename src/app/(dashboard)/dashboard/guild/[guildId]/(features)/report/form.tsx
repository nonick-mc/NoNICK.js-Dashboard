'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/models/settingModel';
import { APIChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { nullToUndefinedOrValue } from '@/lib/utils';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { ChannelSelect } from '../../channel-select';
import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import { RoleSelect } from '../../role-select';
import { SubmitButton } from '../../submit-button';
import { useState } from 'react';
import { CardTitle } from '../../header';

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

export function Form({ channels, roles, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
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
    setIsLoading(true);
    patchServerSetting(guildId, 'report', values)
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <Card>
        <CardBody className='flex flex-col gap-6 p-6'>
          <Controller
            control={control}
            name='channel'
            render={({ field, fieldState: { error } }) => (
              <ChannelSelect
                classNames={{
                  base: 'items-center justify-between',
                  mainWrapper: 'max-w-xs',
                }}
                label='通報を受け取るチャンネル'
                labelPlacement='outside-left'
                channels={channels}
                filter={(channel) => channel.type === ChannelType.GuildText}
                onChange={field.onChange}
                defaultSelectedKeys={field.value ? [field.value] : []}
                isInvalid={!!error}
                errorMessage={error?.message}
                isRequired
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>通知設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='mention.enable'
            render={({ field }) => (
              <Switch
                classNames={{
                  base: 'max-w-none flex-row-reverse justify-between gap-3',
                  label: 'text-sm',
                }}
                onChange={field.onChange}
                defaultChecked={field.value}
              >
                <div className='flex flex-col'>
                  <p>メンション通知を有効にする</p>
                  <p className='text-default-500'>
                    通報が送られた際に特定のロールをメンションします。
                  </p>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='mention.role'
            render={({ field, fieldState: { error } }) => (
              <RoleSelect
                classNames={{
                  base: 'items-center justify-between',
                  mainWrapper: 'max-w-xs',
                }}
                label='メンションするロール'
                labelPlacement='outside-left'
                roles={roles}
                filter={(role) => !role.managed}
                onChange={field.onChange}
                defaultSelectedKeys={field.value ? [field.value] : []}
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={!watch('mention.enable')}
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
