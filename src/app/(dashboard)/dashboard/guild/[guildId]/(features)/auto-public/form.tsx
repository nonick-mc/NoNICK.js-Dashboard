'use client';

import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { patchServerSetting } from '@/lib/mongoose/middleware';
import { IServerSettings } from '@/models/settingModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormItemLayout, SubmitButton } from '../../_components/form';
import { Switch } from '@/components/ui/switch';
import { ChannelSelect } from '../../_components/select';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

type Props = {
  channels: APIChannel[];
  setting: IServerSettings['autoPublic'] | undefined;
};

const schema = z.object({
  enable: z.boolean(),
  channels: z.array(
    z.object({ id: z.string().regex(/^\d{16,19}$/, { message: '選択してください' }) }),
  ),
});

export default function SettingForm({ channels, setting }: Props) {
  const { toast } = useToast();
  const { guildId }: { guildId: string } = useParams();
  const [loading, setLoading] = useState(false);

  const announceChannels = channels.filter(
    (channel) => channel.type === ChannelType.GuildAnnouncement,
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      enable: !!setting?.enable,
      channels: setting?.channels || [],
    },
  });

  const { fields, append, remove } = useFieldArray<z.infer<typeof schema>>({
    control: form.control,
    name: 'channels',
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    patchServerSetting(guildId, 'autoPublic', values)
      .then(() => toast({ title: '設定を保存しました！' }))
      .catch(() =>
        toast({
          title: '設定の保存に失敗しました',
          description: '時間をおいて再試行してください。',
          variant: 'destructive',
        }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6'>
        <Card>
          <CardContent className='space-y-4 pt-6'>
            <FormField
              control={form.control}
              name='enable'
              render={({ field }) => (
                <FormItemLayout title='自動アナウンス公開を有効にする'>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItemLayout>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>チャンネル設定</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormItemLayout
              title='アナウンスチャンネルを管理'
              description='自動公開するチャンネルを追加・削除します'
              disabled={!form.watch('enable')}
            >
              <Button
                type='button'
                variant='outline'
                onClick={() => append({ id: '' })}
                disabled={
                  !form.watch('enable') || announceChannels.length <= form.watch('channels').length
                }
              >
                チャンネルを追加
              </Button>
            </FormItemLayout>
            {!!fields.length && (
              <div className='flex flex-col gap-3'>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`channels.${index}.id`}
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <div className='flex gap-3'>
                          <ChannelSelect
                            channels={channels}
                            filter={(channel) =>
                              channel.type === ChannelType.GuildAnnouncement ||
                              !form
                                .watch('channels')
                                .filter((value, i) => i !== index)
                                .some(({ id }) => id === channel.id)
                            }
                            onValueChange={field.onChange}
                            defaultValue={field.value || undefined}
                            triggerClassName='w-auto flex-1'
                            disabled={!form.watch('enable')}
                          />
                          <Button
                            onClick={() => remove(index)}
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='text-red-500 hover:bg-red-500/20 hover:text-red-500'
                            disabled={!form.watch('enable')}
                          >
                            <Trash2Icon size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <SubmitButton disabled={loading} />
      </form>
    </Form>
  );
}
