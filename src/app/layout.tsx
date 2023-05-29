import '../globals.css'
import { Metadata } from 'next';
import { M_PLUS_2, Montserrat, Noto_Sans_JP } from 'next/font/google';
import Provider from './provider';

// fonts
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-notoSansJp',
});

const mplus2 = M_PLUS_2({
  subsets: ['latin'],
  variable: '--font-mPlus2'
})

// metadata
export const metadata: Metadata = {
  title: 'NoNICK.js',
  description: 'サーバーを簡単・効率的に管理できるDiscordBot',
}

// layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${mplus2.variable} ${notoSansJp.variable} font-mplus2`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
