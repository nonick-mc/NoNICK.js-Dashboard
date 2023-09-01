'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/schemas/ServerSettings';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { ChannelType } from 'discord-api-types/v10';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  setting: IServerSettings['message']['expansion'] | undefined,
}

const schema =  z.object({
  enable: z.boolean(),
  ignore: z.object({
    types: z.array(z.coerce.number()).optional(),
    channels: z.array(z.string()).optional(),
  }),
});

const ignoreChannelTypes = [
  {
    label: 'アナウンスチャンネル',
    id: String(ChannelType.GuildAnnouncement),
  },
  {
    label: 'ボイスチャンネル',
    id: String(ChannelType.GuildVoice),
  },
  {
    label: 'スレッド (公開)',
    id: String(ChannelType.PublicThread),
  },
  {
    label: 'スレッド (プライベート)',
    id: String(ChannelType.PrivateThread),
  },
];

export const SettingForm: FC<Props> = ({ setting }) => {
  const { toast } = useToast();
  const [ loading, setLoading ] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      ignore: {
        types: setting?.ignore.types,
        channels: setting?.ignore.channels,
      }
    }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    toast({ title: 'デバッグ', description: JSON.stringify(values, null, 2) });
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6'>
        <Card className='p-6'>
          <FormField
            control={form.control}
            name='enable'
            render={({ field }) => (
              <FormItemLayout title='メッセージURL展開を有効にする'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItemLayout>
            )}
          />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>例外設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='ignore.types'
              render={({ field }) => (
                <FormItemLayout
                  title='チャンネルの種類'
                  description='特定の種類のチャンネルでURL展開を行わないようにします。'
                  layout='col'
                >
                  {ignoreChannelTypes.map(({ id, label }) => (
                    <FormField
                      key={id}
                      control={form.control}
                      name='ignore.types'
                      render={({ field }) => (
                        <FormItem
                          key={id}
                          className='flex flex-row items-start space-x-3 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(Number(id))}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value!, id])
                                  : field.onChange(field.value?.filter((value) => value !== Number(id))                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>
        <SubmitButton disabled={loading}/>
      </form>
    </Form>
  );
}

