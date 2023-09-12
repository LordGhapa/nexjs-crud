import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';
import { GlobalStyles } from './../styles/global-styles';
import React from 'react';

import { AppProps } from 'next/app';
import isPropValid from '@emotion/is-prop-valid';
import Head from 'next/head';

import NextNProgress from 'nextjs-progressbar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <ThemeProvider theme={theme}>
            <NextNProgress color={theme.colors.info} height={10} />
            <Component {...pageProps} />
            <Head>
              <title>My new cool app</title>
            </Head>
            <GlobalStyles />
          </ThemeProvider>
        </StyleSheetManager>
      </SessionProvider>
    </>
  );
}
