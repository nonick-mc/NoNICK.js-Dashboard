'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </ThemeProvider>
    </AnimatePresence>
  )
}