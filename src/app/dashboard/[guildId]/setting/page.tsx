import { TextChannelSelect } from '@/components/dashboard/select/channel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export default function Page({ params }: { params: { guildId: string } }) {
  return (
    <div className='space-y-6'>
      <section className='space-y-2'>
        <h1 className='text-3xl font-black'>設定</h1>
        <h2 className='text-lg text-muted-foreground'>NoNICK.jsの全般設定を行います。</h2>
      </section>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <section>
              <CardTitle className='text-xl'>お知らせ設定</CardTitle>
              <CardDescription>NoNICK.jsの重要なお知らせが来た際、チャンネルにお知らせを送信します。</CardDescription>
            </section>
            <Switch />
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between'>
            <section>
              <h2>送信先</h2>
              <p className='text-muted-foreground text-sm'>「チャンネルを見る」「メッセージを送信」権限をNoNICK.jsに与えている必要があります。</p>
            </section>
            <TextChannelSelect guildId={params.guildId}/>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <section>
              <CardTitle className='flex gap-2 items-center text-xl'>
                言語設定
                <Badge variant='secondary'>Beta</Badge>
              </CardTitle>
              <CardDescription>サーバー内での使用言語を設定します。この機能はベータ版であり、正しく動作しない可能性があります。</CardDescription>
            </section>
            <Select disabled={true}>
              <SelectTrigger className='w-[250px]'>
                <SelectValue placeholder='選択'/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ja_JP'>日本語</SelectItem>
                <SelectItem value='en_US'>English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <div className='flex gap-2 items-stretch'>
        <Button>設定を保存</Button>
        <Button variant='outline'>変更をキャンセル</Button>
      </div>
    </div>
  )
}