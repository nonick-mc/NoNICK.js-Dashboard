'use client';

import { ConsoleWarningProvider } from '@/components/warning';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <ConsoleWarningProvider>{children}</ConsoleWarningProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
