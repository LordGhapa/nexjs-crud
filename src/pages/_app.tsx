import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';
import { GlobalStyles } from './../styles/global-styles';
import React from 'react';

import { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
