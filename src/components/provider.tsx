'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      {children}
    </ThemeProvider>
  );
}