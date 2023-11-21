'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  SelectItem,
  Switch,
  Tooltip,
} from '@nextui-org/react';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { Controller, useForm } from 'react-hook-form';
import { CardTitle } from '../../header';
import { ChannelSelect } from '../../channel-select';
import { selectClassNames, switchClassNames } from '../../classnames';

const schema = z.object({
  announce: z.discriminatedUnion('enable', [
    z.object({
      enable: z.literal(true),
      channel: z.string({ required_error: '選択してください' }),
    }),
    z.object({
      enable: z.literal(false),
      channel: z.string().optional(),
    }),
  ]),
  lang: z.string(),
});

export function Form({ channels }: { channels: APIChannel[] }) {
  const { control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      announce: {
        enable: false,
        channel: undefined,
      },
      lang: 'ja',
    },
  });

  return (
    <form className='flex flex-col gap-6 pb-6'>
      <Card>
        <CardHeader className='p-6'>
          <CardTitle>お知らせ設定</CardTitle>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='announce.enable'
            render={({ field }) => (
              <Switch
                classNames={switchClassNames}
                onChange={field.onChange}
                defaultChecked={field.value}
                isDisabled
              >
                <div className='flex flex-col'>
                  <p>運営からのお知らせを有効にする</p>
                  <p className='text-default-500'>
                    BOTに関する重要情報、アップデート内容を受け取ります。
                  </p>
                </div>
              </Switch>
            )}
          />
          <Controller
            control={control}
            name='announce.channel'
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
                isRequired
                isDisabled
              />
            )}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader className='gap-3 p-6'>
          <CardTitle>言語設定</CardTitle>
          <Tooltip
            classNames={{ base: 'max-w-[220px]', content: 'text-foreground' }}
            showArrow={true}
            content='この機能はベータ版であり、予告なく変更が行われる可能性があります。'
          >
            <Chip size='sm' variant='flat' color='primary'>
              ベータ
            </Chip>
          </Tooltip>
        </CardHeader>
        <CardBody className='flex flex-col gap-6 p-6 pt-0'>
          <Controller
            control={control}
            name='lang'
            render={({ field, fieldState: { error } }) => (
              <Select
                classNames={selectClassNames}
                variant='bordered'
                label='NoNICK.jsの言語'
                labelPlacement='outside-left'
                onChange={field.onChange}
                defaultSelectedKeys={field.value ? [field.value] : []}
                errorMessage={error?.message}
                isInvalid={!!error}
                isRequired
                isDisabled
              >
                <SelectItem key='ja' value='ja'>
                  日本語 (Japanese)
                </SelectItem>
              </Select>
            )}
          />
        </CardBody>
      </Card>
      <div>
        <Button color='primary' isDisabled>
          変更を保存
        </Button>
      </div>
    </form>
  );
}
