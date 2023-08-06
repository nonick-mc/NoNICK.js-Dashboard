import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FiArrowLeft } from 'react-icons/fi';
import { Metadata } from 'next';
import UserAuth from '@/components/auth/user-auth-form';

export const metadata: Metadata = {
  title: 'ログイン'
}

export default function Page() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Card className='w-[400px] space-y-4 lg:p-3'>
        <CardHeader className='space-y-6'>
          <Logo width={140}/>
          <section>
            <CardTitle className='text-xl'>ログインが必要です</CardTitle>
            <CardDescription>Discordアカウントを使用して続行</CardDescription>
          </section>
        </CardHeader>
        <CardContent className='space-y-6'>
          <UserAuth/>
          <div className='text-muted-foreground text-sm'>
            ログインすることで、NoNICK.jsの
            <Link href={'https://docs.nonick-js.com/important/teams-of-service/'} className='underline' target='_blank' rel='noreferrer'>
              利用規約
            </Link>
            および
            <Link href={'https://docs.nonick-js.com/important/privacy-policy/'} className='underline' target='_blank' rel='noreferrer'>
              プライバシーポリシー
            </Link>
            に同意したとみなされます。
          </div>
        </CardContent>
      </Card>
    </div>
  )
}