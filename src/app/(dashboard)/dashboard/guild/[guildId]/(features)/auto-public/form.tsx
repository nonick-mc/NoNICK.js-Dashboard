'use client';

import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { switchClassNames } from '../../classnames';
import { CardTitle } from '../../header';
import { ChannelSelect } from '../../channel-select';
import { SubmitButton } from '../../submit-button';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['autoPublic'] | undefined;
};

const schema = z.object({
  enable: z.boolean(),
  channels: z.array(z.string().regex(/^\d{17,20}$/, '無効なSnowFlakeです。')),
});

export function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      channels: setting?.channels || [],
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    patchServerSetting(guildId, 'autoPublic', values)
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
                <span>自動アナウンス公開を有効にする</span>
              </Switch>
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>チャンネル設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='channels'
            render={({ field, fieldState: { error } }) => (
              <ChannelSelect
                classNames={{ trigger: 'min-h-unit-12' }}
                label='自動公開するチャンネル'
                channels={channels}
                filter={(channel) =>
                  channel.type === ChannelType.GuildAnnouncement
                }
                onSelectionChange={(keys) => field.onChange(Array.from(keys))}
                defaultSelectedKeys={field.value}
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={!watch('enable')}
                isMultiline
              />
            )}
          />
        </CardBody>
      </Card>
      <SubmitButton loading={isLoading} />
    </form>
  );
}
