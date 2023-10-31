import './globals.css';
import metadataConfig from '@/config/metadata';
import { Noto_Sans_JP } from 'next/font/google';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Provider } from './provider';
import { Toaster } from '@/components/ui/toaster';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-notoSansJP',
});

export const metadata: Metadata = {
  metadataBase: metadataConfig.url,
  title: {
    default: metadataConfig.name,
    template: `%s - ${metadataConfig.name}`,
  },
  description: metadataConfig.description,
  themeColor: '#007af8',
  openGraph: {
    title: metadataConfig.name,
    description: metadataConfig.description,
    siteName: metadataConfig.name,
    url: metadataConfig.url,
    locale: 'ja-JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataConfig.name,
    description: metadataConfig.description,
    site: '@nonick_js',
    creator: '@nonick_mc',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>
        <Provider>
          <main>{children}</main>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
