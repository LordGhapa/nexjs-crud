import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Loading } from '../../templates/Loading';
import React from 'react';

export default function RedirectDiscord() {
  const router = useRouter();
  useEffect(() => {
    const token = router.query.access_token;
    async function redirect() {
      const prodServerUrl =
        process.env.NEXT_PUBLIC_PROD_SERVER || 'http://localhost:1337';
      const loginDiscordApi = await fetch(
        `${prodServerUrl}/api/auth/discord/callback?access_token=${token}`,
      );

      if (!loginDiscordApi.ok) {
        console.warn('erro ao tenta fazer login');
        return;
      }
      const data = loginDiscordApi;
      const login = await data.json();

      await signIn('credentials', {
        login: JSON.stringify(login),
        redirect: false,
      });
    }

    const esperando = setTimeout(async () => {
      try {
        await redirect();
      } catch (e) {
        console.log('ERROR:', e);
      } finally {
        router.push('/');
      }
    }, 1000);
    return () => clearTimeout(esperando);
  }, [router, router?.query?.access_token]);
  return <Loading />;
}
