'use client';

import { ConsoleWarningProvider } from '@/components/warning';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
        <ConsoleWarningProvider>{children}</ConsoleWarningProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
