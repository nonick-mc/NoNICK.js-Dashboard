import '../globals.css';
import { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Providers from './provider';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-notosansjp',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className='dark'>
      <body className={`${notoSansJp.variable} font-notosansjp`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
