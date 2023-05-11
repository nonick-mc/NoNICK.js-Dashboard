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

export default function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  )
}