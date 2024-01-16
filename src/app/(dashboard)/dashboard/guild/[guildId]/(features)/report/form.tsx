'use client';

import { useToast } from '@/components/ui/use-toast';
import { ModerateSettingSchema } from '@/database/models';
import { useFormGuard } from '@/hooks/use-form-guard';
import { Discord, TailwindCSS } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@nextui-org/switch';
import { APIGuildChannel, APIRole, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import * as z from 'zod';
import { ChannelSelect } from '../../channel-select';
import {
  FormCard,
  FormSelectClassNames,
  FormSwitchClassNames,
  SubmitButton,
  SwitchLabel,
} from '../../form-utils';
import { RoleSelect } from '../../role-select';
import { updateServerSetting } from './action';

export const schema = z.object({
  channel: z.string().regex(Discord.Regex.Snowflake, '無効なチャンネルIDです'),
  includeModerator: z.boolean(),
  progressButton: z.boolean(),
  mention: z.discriminatedUnion('enable', [
    z.object({
      enable: z.literal(true),
      role: z.string().regex(Discord.Regex.Snowflake, '無効なロールIDです'),
    }),
    z.object({
      enable: z.literal(false),
      role: z.string().optional(),
    }),
  ]),
});

type Props = {
  channels: APIGuildChannel<Exclude<ChannelType, 'DM' | 'GroupDM'>>[];
  roles: APIRole[];
  setting?: ModerateSettingSchema['report'];
};

export default function Form({ channels, roles, setting }: Props) {
  const { toast } = useToast();
  const guildId = useParams().guildId as string;
  const [isLoading, setIsLoading] = useState(false);
  const isTablet = useMediaQuery({ query: TailwindCSS.MediaQuery.md });

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: setting ?? {
      channel: undefined,
      includeModerator: false,
      progressButton: true,
      mention: {
        enable: false,
        role: undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    const res = await updateServerSetting.bind(null, guildId)(values);
    setIsLoading(false);

    if (res.isSuccess)
      toast({ title: '設定を保存しました！', variant: 'success' });
    else
      toast({
        title: '設定の保存に失敗しました',
        description: '時間をおいて再試行してください。',
        variant: 'destructive',
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <FormCard>
        <Controller
          control={control}
          name='channel'
          render={({ field, fieldState: { error } }) => (
            <ChannelSelect
              classNames={FormSelectClassNames}
              label='通報を受け取るチャンネル'
              labelPlacement={isTablet ? 'outside-left' : 'outside'}
              channels={channels}
              types={[ChannelType.GuildText]}
              onChange={field.onChange}
              defaultSelectedKeys={field.value ? [field.value] : []}
              isInvalid={!!error}
              errorMessage={error?.message}
              isRequired
            />
          )}
        />
      </FormCard>
      <FormCard title='基本設定'>
        <Controller
          control={control}
          name='includeModerator'
          render={({ field }) => (
            <Switch
              classNames={FormSwitchClassNames}
              onChange={field.onChange}
              defaultSelected={field.value}
            >
              <SwitchLabel
                title='モデレーターも通報の対象にする'
                description='有効にすると、「サーバー管理」権限を持つユーザーをメンバーが通報できるようになります。'
              />
            </Switch>
          )}
        />
        <Controller
          control={control}
          name='progressButton'
          render={({ field }) => (
            <Switch
              classNames={FormSwitchClassNames}
              onChange={field.onChange}
              defaultSelected={field.value}
            >
              <SwitchLabel
                title='進捗ボタンを表示する'
                description='送られた通報に「対処済み」「無視」などの、通報のステータスを管理できるボタンを表示します。'
              />
            </Switch>
          )}
        />
      </FormCard>
      <FormCard title='通知設定'>
        <Controller
          control={control}
          name='mention.enable'
          render={({ field }) => (
            <Switch
              classNames={FormSwitchClassNames}
              onChange={field.onChange}
              defaultSelected={field.value}
            >
              <SwitchLabel
                title='メンション通知を有効にする'
                description='通報が送られた際に特定のロールをメンションします'
              />
            </Switch>
          )}
        />
        <Controller
          control={control}
          name='mention.role'
          render={({ field, fieldState: { error } }) => (
            <RoleSelect
              classNames={FormSelectClassNames}
              label='メンションするロール'
              labelPlacement={isTablet ? 'outside-left' : 'outside'}
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
      </FormCard>
      <SubmitButton isLoading={isLoading} />
    </form>
  );
}
