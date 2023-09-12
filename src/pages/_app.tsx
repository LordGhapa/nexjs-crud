import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { theme } from '../styles/theme';
import { GlobalStyles } from './../styles/global-styles';
import React, { useEffect, useState } from 'react';

import { AppProps } from 'next/app';
import isPropValid from '@emotion/is-prop-valid';
import Head from 'next/head';

import { Router } from 'next/router';
import { Loading } from '../templates/Loading';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const urlToInitServer =
      process.env.NEXT_PUBLIC_INIT_SERVER ||
      'http://localhost:1337/api/authors';

    function initServer() {
      fetch(urlToInitServer).then(() => setLoading(false));
    }
    initServer();
  }, []);

  useEffect(() => {
    console.warn('FUI CHAMADO');

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <SessionProvider session={session}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <ThemeProvider theme={theme}>
            {loading ? <Loading /> : <Component {...pageProps} />}
            <Head>
              <title>CRUD</title>
            </Head>
            <GlobalStyles />
          </ThemeProvider>
        </StyleSheetManager>
      </SessionProvider>
    </>
  );
}
