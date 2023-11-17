import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Providers } from './provider';
import metadataConfig from '@/config/metadata';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>
        <Providers>
          <main className='bg-background text-foreground'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
