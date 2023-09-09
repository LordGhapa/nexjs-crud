import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';
import { GlobalStyles } from './../styles/global-styles';
import React from 'react';

import { AppProps } from 'next/app';
import isPropValid from '@emotion/is-prop-valid';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
            <GlobalStyles />
          </ThemeProvider>
        </StyleSheetManager>
      </SessionProvider>
    </>
  );
}
