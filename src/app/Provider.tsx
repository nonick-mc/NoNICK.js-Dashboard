'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme, StyledEngineProvider, CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function MuiThemeProvider({ children }: Props) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export function MuiStyledEngineProvider({ children }: Props) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
}

export function NextAuthSessionProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}