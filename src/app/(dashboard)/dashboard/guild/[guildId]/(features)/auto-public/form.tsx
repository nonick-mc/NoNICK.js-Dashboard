'use client';

import { useToast } from '@/components/ui/use-toast';
import { publishAnnounceSchema } from '@/database/models';
import { useFormGuard } from '@/hooks/use-form-guard';
import { intersect } from '@/lib/utils';
import { GuildChannel } from '@/types/discord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@nextui-org/switch';
import { ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { createContext, useContext } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import * as z from 'zod';
import { updateSetting } from '../../actions';
import { ChannelSelect } from '../../channel-select';
import {
  FormCard,
  FormSwitchClassNames,
  SubmitButton,
  SwitchLabel,
} from '../../form-utils';
import { publishAnnounceZodSchema } from './schema';

type Props = {
  channels: GuildChannel[];
  setting?: publishAnnounceSchema;
};

const FormContext = createContext<Props>({
  channels: [],
  setting: undefined,
});

export default function Form(props: Props) {
  const { toast } = useToast();
  const guildId = useParams().guildId as string;

  const form = useForm<z.infer<typeof publishAnnounceZodSchema>>({
    resolver: zodResolver(publishAnnounceZodSchema),
    defaultValues: {
      enable: !!props.setting?.enable,
      channels: props.setting?.channels ?? [],
    },
  });

  async function onSubmit(values: z.infer<typeof publishAnnounceZodSchema>) {
    const res = await updateSetting.bind(
      null,
      'automation',
      'publishAnnounce',
      guildId,
    )(values);
    toast(res.message);
    if (res.isSuccess) return form.reset(values);
  }

  useFormGuard(form.formState.isDirty);

  return (
    <FormContext.Provider value={props}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6'
        >
          <EnableSetting />
          <GeneralSetting />
          <SubmitButton />
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

function EnableSetting() {
  const form = useFormContext<z.infer<typeof publishAnnounceZodSchema>>();

  return (
    <FormCard>
      <Controller
        control={form.control}
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
  );
}

function GeneralSetting() {
  const { channels } = useContext(FormContext);
  const form = useFormContext<z.infer<typeof publishAnnounceZodSchema>>();
  const { enable } = useWatch<z.infer<typeof publishAnnounceZodSchema>>();

  return (
    <FormCard title='チャンネル設定'>
      <Controller
        control={form.control}
        name='channels'
        render={({ field, fieldState: { error } }) => (
          <ChannelSelect
            label='自動公開するチャンネル'
            labelPlacement='outside'
            selectionMode='multiple'
            channels={channels}
            types={[ChannelType.GuildAnnouncement]}
            onSelectionChange={(keys) => field.onChange(Array.from(keys))}
            defaultSelectedKeys={intersect(
              field.value,
              channels,
              (a, b) => a === b.id,
            )}
            errorMessage={error?.message}
            isInvalid={!!error}
            isDisabled={!enable}
          />
        )}
      />
    </FormCard>
  );
}
