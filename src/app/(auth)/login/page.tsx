import Logo from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';
import { UserAuthForm } from './form';

export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[400px] space-y-4 lg:p-3'>
        <CardHeader className='space-y-6'>
          <Logo width={140} />
          <section>
            <CardTitle className='text-xl'>ログインが必要です</CardTitle>
            <CardDescription>Discordアカウントを使用して続行</CardDescription>
          </section>
        </CardHeader>
        <CardContent className='space-y-6'>
          <UserAuthForm />
          <div className='text-sm text-muted-foreground'>
            ログインすることで、NoNICK.jsの
            <Link
              href={'https://docs.nonick-js.com/important/teams-of-service/'}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
              利用規約
            </Link>
            および
            <Link
              href={'https://docs.nonick-js.com/important/privacy-policy/'}
              className='underline'
              target='_blank'
              rel='noreferrer'
            >
              プライバシーポリシー
            </Link>
            に同意したとみなされます。
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
