import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Noto_Sans_JP } from 'next/font/google';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import { Toaster } from '@/components/ui/toaster';

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: siteConfig.metadata.url,
  title: {
    default: siteConfig.metadata.name,
    template: `%s - ${siteConfig.metadata.name}`,
  },
  description: siteConfig.metadata.description,
  themeColor: '#007af8',
  openGraph: {
    title: siteConfig.metadata.name,
    description: siteConfig.metadata.description,
    siteName: siteConfig.metadata.name,
    locale: 'ja-JP',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.name,
    description: siteConfig.metadata.description,
    site: '@nonick_js',
    creator: '@nonick_mc',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <Provider>
          <NextTopLoader
            color='#3b82f6'
            showSpinner={false}
            shadow={false}
          />
          {children}
        </Provider>
        <Toaster/>
      </body>
    </html>
  )
}