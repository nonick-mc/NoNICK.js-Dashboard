'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { IServerSettings } from '@/schemas/ServerSettings';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormItemLayout, SubmitButton } from '../../form-items';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChannelSelect } from '../../selects';
import { APIChannel, ChannelType } from 'discord-api-types/v10';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2Icon } from 'lucide-react';

const schema = z.discriminatedUnion('enable', [
  z.object({
    enable: z.literal(true),
    channels: z.array(z.string(), { invalid_type_error: 'a' }),
  }),
  z.object({
    enable: z.literal(false),
    channels: z.array(z.string()).optional(),
  }),
]);

type Props = {
  channels: APIChannel[],
  setting: IServerSettings['autoPublic'] | undefined,
}

// export const SettingForm: FC<Props> = ({ channels, setting }) => {
//   const [ loading, setLoading ] = useState(false);
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof schema>>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       enable: !!setting?.enable,
//       channels: setting?.channels
//     }
//   });

//   const { fields, append } = useFieldArray({
//     control: form.control,
//     name: 'channels',
//   })

//   async function onSubmit(values: z.infer<typeof schema>) {
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6'>
//         <Card className='p-6'>
//           <FormField
//             control={form.control}
//             name='enable'
//             render={({ field }) => (
//               <FormItemLayout title='自動アナウンス公開を有効にする'>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItemLayout>
//             )}
//           />
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>全般設定</CardTitle>
//           </CardHeader>
//           <CardContent className='space-y-4'>
//           <div className='space-y-6'>
//             <FormItemLayout
//               title='チャンネル'
//               description='自動公開を行うアナウンスチャンネルを管理します。'
//               disabled={!form.watch('enable')}
//               required
//             >
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button disabled={!form.watch('enable')} variant='outline'>チャンネルを追加</Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>チャンネルを追加</DialogTitle>
//                     <DialogDescription>自動公開に追加するチャンネルを選択してください</DialogDescription>
//                   </DialogHeader>
//                   <div className='flex gap-3'>
//                     <ChannelSelect
//                       channels={channels}
//                       types={[ChannelType.GuildAnnouncement]}
//                       triggerClassName='flex-1'
//                     />
//                     <Button
//                       type='submit'
//                       onClick={() => {
//                         if (fields.some((v) => v.id === '1')) {
//                           toast({ title: '既に追加されています' })
//                         }
//                         append('1');
//                       }}
//                     >
//                       追加
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </FormItemLayout>
//             <Table className='border' >
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>チャンネル名</TableHead>
//                   <TableHead>ID</TableHead>
//                   <TableHead className='w-[50px]'/>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {fields?.map((field, index) => (
//                   <FormField
//                     control={form.control}
//                     key={field.id}
//                     name={`channels.${index}`}
//                     render={({ field }) => (
//                       <TableRow>
//                         <TableCell>{channels.find((ch) => ch.id == field.value)?.name || '不明なチャンネル'}</TableCell>
//                         <TableCell>{field.value}</TableCell>
//                         <TableCell>
//                           <Dialog>
//                             <DialogTrigger asChild>
//                               <Button disabled={!form.watch('enable')} size='icon' variant='ghost'><Trash2Icon size={16}/></Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                               <DialogHeader>
//                                 <DialogTitle>確認</DialogTitle>
//                                 <DialogDescription>
//                                   <span className='font-extrabold'>{channels.find((ch) => ch.id == field.value)?.name || '不明なチャンネル'}</span>
//                                   を自動公開から削除しますか？
//                                 </DialogDescription>
//                               </DialogHeader>
//                               <div className='flex gap-3 justify-end'>
//                                 {/* <Button variant='outline'>いいえ</Button> */}
//                                 <Button>はい</Button>
//                               </div>
//                             </DialogContent>
//                           </Dialog>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   />
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           </CardContent>
//         </Card>
//         <SubmitButton disabled={loading}/>
//       </form>
//     </Form>
//   );
// }