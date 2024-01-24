'use client';

import { useToast } from '@/components/ui/use-toast';
import { AutomationSettingSchema, memberVerifySchema } from '@/database/models';
import { useFormGuard } from '@/hooks/use-form-guard';
import { GuildChannel } from '@/types/discord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@nextui-org/switch';
import { GuildVerificationLevel } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { createContext } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import * as z from 'zod';
import { updateSetting } from '../../actions';
import {
  FormCard,
  FormSwitchClassNames,
  SubmitButton,
  SwitchLabel,
} from '../../form-utils';
import { memberVerifyZodSchema } from './schema';

type Props = {
  channels: GuildChannel[];
  setting?: memberVerifySchema;
};

const FormContext = createContext<Props>({
  channels: [],
  setting: undefined,
});

export default function Form(props: Props) {
  const { toast } = useToast();
  const guildId = useParams().guildId as string;

  const form = useForm<z.infer<typeof memberVerifyZodSchema>>({
    resolver: zodResolver(memberVerifyZodSchema),
    defaultValues: props.setting ?? {
      enable: false,
      time: {
        start: null,
        end: null,
      },
      level: {
        before: null,
        after: GuildVerificationLevel.Low,
      },
      log: {
        enable: false,
        channel: '',
      },
    },
  });

  async function onSubmit(values: z.infer<typeof memberVerifyZodSchema>) {
    const res = await updateSetting.bind(
      null,
      'automation',
      'memberVerify',
      guildId,
    )(values);
    toast(res.message);
    if (res.isSuccess) return form.reset();
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
          <SubmitButton />
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

function EnableSetting() {
  const form = useFormContext<z.infer<typeof memberVerifyZodSchema>>();

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
            <SwitchLabel title='自動認証レベル変更を有効にする' />
          </Switch>
        )}
      />
    </FormCard>
  );
}

// function GeneralSetting() {
//   const { channels } = useContext(FormContext);
//   const form = useFormContext<z.infer<typeof memberVerifyZodSchema>>();
//   const { enable } = useWatch<z.infer<typeof memberVerifyZodSchema>>();

//   return <FormCard title='全般設定'>

//   </FormCard>;
// }
