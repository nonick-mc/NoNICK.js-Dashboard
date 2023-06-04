import '../globals.css';
import { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Providers from './provider';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-notosansjp',
});

export const metadata: Metadata = {
  title: 'NoNICK.js',
  description: 'Discordサーバーの管理をサポートする多機能BOT',
  themeColor: '#007af8',
  openGraph: {
    title: 'NoNICK.js',
    description: 'Discordサーバーの管理をサポートする多機能BOT',
    url: 'https://nonick-js.com',
    siteName: 'NoNICK.js',
    images: [{
      url: '/thumbnail.png',
      width: 1600,
      height: 900,
    }],
    locale: 'ja-JP',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={`${notoSansJp.variable} font-notosansjp`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
