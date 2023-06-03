'use client';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </AnimatePresence>
  )
}