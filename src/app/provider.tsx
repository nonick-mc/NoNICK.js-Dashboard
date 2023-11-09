'use client';

import { ConsoleWarningProvider } from '@/components/warning';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <ConsoleWarningProvider>
          <main className='bg-background text-foreground'>{children}</main>
        </ConsoleWarningProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
