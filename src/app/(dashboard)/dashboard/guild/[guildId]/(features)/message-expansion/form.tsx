'use client';

import * as z from 'zod';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { IServerSettings } from '@/models/settingModel';
import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { SubmitButton } from '../../submit-button';
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Switch,
  cn,
} from '@nextui-org/react';
import { switchClassNames } from '../../classnames';
import { CardTitle } from '../../header';
import { ChannelSelect } from '../../channel-select';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['message']['expansion'] | undefined;
};

const schema = z.object({
  enable: z.boolean(),
  ignore: z.object({
    types: z.array(z.coerce.number({ invalid_type_error: '無効な値です。' })),
    channels: z.array(z.string().regex(/^\d{17,20}$/, '無効なSnowFlakeです。')),
  }),
});

export function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { control, watch, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      ignore: {
        types: setting?.ignore.types || [],
        channels: setting?.ignore.channels || [],
      },
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);
    patchServerSetting(guildId, 'message.expansion', values)
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
                <span>メッセージURL展開を有効にする</span>
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
          <Controller
            control={control}
            name='ignore.types'
            render={({ field, fieldState: { error } }) => (
              <CheckboxGroup
                classNames={{
                  wrapper: 'gap-3',
                  label: cn('text-sm text-foreground', {
                    'opacity-disabled': !watch('enable'),
                  }),
                }}
                label='URL展開を行わないチャンネルの種類'
                defaultValue={field.value.map((v) => `${v}`)}
                onValueChange={field.onChange}
                isInvalid={!!error}
                errorMessage={error?.message}
                isDisabled={!watch('enable')}
              >
                <Checkbox
                  classNames={{ label: 'text-sm' }}
                  value={`${ChannelType.GuildAnnouncement}`}
                >
                  アナウンスチャンネル
                </Checkbox>
                <Checkbox
                  classNames={{ label: 'text-sm' }}
                  value={`${ChannelType.GuildStageVoice}`}
                >
                  ステージチャンネル
                </Checkbox>
                <Checkbox
                  classNames={{ label: 'text-sm' }}
                  value={`${ChannelType.PublicThread}`}
                >
                  公開スレッド
                </Checkbox>
                <Checkbox
                  classNames={{ label: 'text-sm' }}
                  value={`${ChannelType.PrivateThread}`}
                >
                  プライベートスレッド
                </Checkbox>
              </CheckboxGroup>
            )}
          />
          <Controller
            control={control}
            name='ignore.channels'
            render={({ field, fieldState: { error } }) => (
              <ChannelSelect
                label='URL展開を行わないチャンネル'
                labelPlacement='outside'
                classNames={{ trigger: 'min-h-unit-12' }}
                channels={channels}
                filter={(channel) =>
                  [
                    ChannelType.GuildText,
                    ChannelType.GuildVoice,
                    ChannelType.GuildAnnouncement,
                    ChannelType.GuildStageVoice,
                  ].includes(channel.type)
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
        </CardBody>
      </Card>
      <SubmitButton loading={isLoading} />
    </form>
  );
}
