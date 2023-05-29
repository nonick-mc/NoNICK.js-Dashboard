'use client';

import React from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes'

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      defaultTheme='dark'
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ThemeProvider>
  )
}