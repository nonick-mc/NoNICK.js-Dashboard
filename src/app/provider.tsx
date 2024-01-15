'use client';

import { ConsoleWarningProvider } from '@/components/warning';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as NProgress from 'nprogress';
import { ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return (
    <SessionProvider>
      <ConsoleWarningProvider>
        <NextUIProvider navigate={router.push}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            {children}
          </ThemeProvider>
        </NextUIProvider>
      </ConsoleWarningProvider>
    </SessionProvider>
  );
}
