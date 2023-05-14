import '@/index.css'

import { M_PLUS_1p, Noto_Sans_JP } from 'next/font/google';
import { CssBaseline, StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const mplus1p = M_PLUS_1p({ weight: ['400', '700', '900'], variable: '--font-mplus1p', subsets: ['latin'] });
const notoSansJp = Noto_Sans_JP({ variable: '--font-notoSansJp', subsets: ['latin'] });

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Component {...pageProps}/>
        </ThemeProvider>
      </StyledEngineProvider>      
    </SessionProvider>
  )
}