'use client';

import { useToast } from '@/components/ui/use-toast';
import { AutomationSettingSchema } from '@/database/models';
import { Discord } from '@/lib/constants';
import { GuildChannel } from '@/types/discord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@nextui-org/switch';
import { ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { updateSetting } from '../../actions';
import { ChannelSelect } from '../../channel-select';
import {
  FormCard,
  FormSwitchClassNames,
  SubmitButton,
  SwitchLabel,
} from '../../form-utils';

const schema = z.object({
  enable: z.boolean(),
  channels: z.array(
    z.string().regex(Discord.Regex.Snowflake, '無効なチャンネルIDです'),
  ),
});

type Props = {
  channels: GuildChannel[];
  setting?: AutomationSettingSchema['publishAnnounce'];
};

export default function Form({ channels, setting }: Props) {
  const { toast } = useToast();
  const guildId = useParams().guildId as string;

  const { control, watch, handleSubmit, reset, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: setting ?? {
      enable: false,
      channels: [],
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await updateSetting.bind(
      null,
      'automation',
      'publishAnnounce',
      guildId,
    )(values);
    toast(res.message);
    if (res.isSuccess) return reset(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <FormCard>
        <Controller
          control={control}
          name='enable'
          render={({ field }) => (
            <Switch
              classNames={FormSwitchClassNames}
              onChange={field.onChange}
              defaultSelected={field.value}
            >
              <SwitchLabel title='自動アナウンス公開を有効にする' />
            </Switch>
          )}
        />
      </FormCard>
      <FormCard title='チャンネル設定'>
        <Controller
          control={control}
          name='channels'
          render={({ field, fieldState: { error } }) => (
            <ChannelSelect
              label='自動公開するチャンネル'
              labelPlacement='outside'
              selectionMode='multiple'
              channels={channels}
              types={[ChannelType.GuildAnnouncement]}
              onSelectionChange={(keys) => field.onChange(Array.from(keys))}
              defaultSelectedKeys={field.value}
              errorMessage={error?.message}
              isInvalid={!!error}
              isDisabled={!watch('enable')}
            />
          )}
        />
      </FormCard>
      <SubmitButton
        isLoading={formState.isSubmitting}
        isDisabled={!formState.isDirty}
      />
    </form>
  );
}
