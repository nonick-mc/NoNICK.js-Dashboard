'use client';

import { useToast } from '@/components/ui/use-toast';
import { memberVerifySchema } from '@/database/models';
import { useFormGuard } from '@/hooks/use-form-guard';
import { TailwindCSS } from '@/lib/constants';
import { zeroPadding } from '@/lib/utils';
import { GuildChannel } from '@/types/discord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Radio, RadioGroup } from '@nextui-org/radio';
import { cn } from '@nextui-org/react';
import { Switch } from '@nextui-org/switch';
import { ChannelType, GuildVerificationLevel } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { createContext, useContext } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import * as z from 'zod';
import { updateSetting } from '../../actions';
import { ChannelSelect } from '../../channel-select';
import {
  FormCard,
  FormSwitchClassNames,
  SubmitButton,
  SwitchLabel,
} from '../../form-utils';
import { NumberSelect } from '../../number-select';
import { wrapValueInArray } from '../../utils';
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

  // MongoDBではschema作成時に定義されていないオブジェクトは空のオブジェクトとして作成される
  const form = useForm<z.infer<typeof memberVerifyZodSchema>>({
    resolver: zodResolver(memberVerifyZodSchema),
    defaultValues: {
      enable: !!props.setting?.enable,
      time: props.setting?.time ?? {
        start: 0,
        end: 6,
      },
      level: props.setting?.level ?? {
        before: null,
        after: GuildVerificationLevel.Low,
      },
      log: props.setting?.log ?? {
        enable: false,
        channel: null,
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
          <LogSetting />
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

function GeneralSetting() {
  const form = useFormContext<z.infer<typeof memberVerifyZodSchema>>();
  const { enable } = useWatch<z.infer<typeof memberVerifyZodSchema>>();
  const isTablet = useMediaQuery({ query: TailwindCSS.MediaQuery.md });

  return (
    <FormCard title='全般設定'>
      <div className='flex flex-col gap-3'>
        <Controller
          control={form.control}
          name='time.start'
          render={({ field, fieldState: { error } }) => (
            <NumberSelect
              label='開始時間'
              labelPlacement={isTablet ? 'outside-left' : 'outside'}
              length={24}
              textFormat={(value) => `${zeroPadding(value, 2)}:00`}
              onChange={field.onChange}
              defaultSelectedKeys={wrapValueInArray(String(field.value))}
              isInvalid={!!error}
              errorMessage={error?.message}
              isDisabled={!enable}
              isRequired
            />
          )}
        />
        <Controller
          control={form.control}
          name='time.end'
          render={({ field, fieldState: { error } }) => (
            <NumberSelect
              label='終了時間'
              labelPlacement={isTablet ? 'outside-left' : 'outside'}
              length={24}
              textFormat={(value) => `${zeroPadding(value, 2)}:00`}
              onChange={field.onChange}
              defaultSelectedKeys={wrapValueInArray(String(field.value))}
              isInvalid={!!error}
              errorMessage={error?.message}
              isDisabled={!enable}
              isRequired
            />
          )}
        />
      </div>
      <Controller
        control={form.control}
        name='level.after'
        render={({ field }) => (
          <RadioGroup
            classNames={{
              label: cn('text-sm text-foreground', {
                'opacity-disabled': !enable,
              }),
            }}
            label='期間内に設定する認証レベル'
            onChange={(e) => field.onChange(e.target.value)}
            defaultValue={`${field.value}`}
            isDisabled={!enable}
            isRequired
          >
            <Radio
              classNames={{ label: 'text-green-500' }}
              value={`${GuildVerificationLevel.Low}`}
              description='メール認証がされているアカウントのみ'
            >
              低
            </Radio>
            <Radio
              classNames={{ label: 'text-yellow-500' }}
              value={`${GuildVerificationLevel.Medium}`}
              description='Discordに登録してから5分以上経過したアカウントのみ'
            >
              中
            </Radio>
            <Radio
              classNames={{ label: 'text-orange-500' }}
              value={`${GuildVerificationLevel.High}`}
              description='このサーバーのメンバーとなってから10分以上経過したアカウントのみ'
            >
              高
            </Radio>
            <Radio
              classNames={{ label: 'text-red-500' }}
              value={`${GuildVerificationLevel.VeryHigh}`}
              description='電話認証がされているアカウントのみ'
            >
              最高
            </Radio>
          </RadioGroup>
        )}
      />
    </FormCard>
  );
}

function LogSetting() {
  const { channels } = useContext(FormContext);
  const form = useFormContext<z.infer<typeof memberVerifyZodSchema>>();
  const { enable, log } = useWatch<z.infer<typeof memberVerifyZodSchema>>();
  const isTablet = useMediaQuery({ query: TailwindCSS.MediaQuery.md });

  return (
    <FormCard title='ログ設定'>
      <Controller
        control={form.control}
        name='log.enable'
        render={({ field }) => (
          <Switch
            classNames={FormSwitchClassNames}
            onChange={field.onChange}
            defaultSelected={field.value}
            isDisabled={!enable}
          >
            <SwitchLabel
              title='ログ機能を有効にする'
              description='レベル変更が開始・終了された際にログを送信します'
            />
          </Switch>
        )}
      />
      <Controller
        control={form.control}
        name='log.channel'
        render={({ field, fieldState: { error } }) => (
          <ChannelSelect
            label='チャンネル'
            labelPlacement={isTablet ? 'outside-left' : 'outside'}
            channels={channels}
            types={[ChannelType.GuildText]}
            onChange={field.onChange}
            defaultSelectedKeys={wrapValueInArray(field.value)}
            isInvalid={!!error}
            errorMessage={error?.message}
            isDisabled={!enable || !log?.enable}
            isRequired
          />
        )}
      />
    </FormCard>
  );
}
