'use client';
import Link from 'next/link';
import * as Styled from './styles';
import { signOut, useSession } from 'next-auth/react';
import { MouseEvent, useEffect, useState } from 'react';

export const Menu = () => {
  const { data: session } = useSession();
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    if (window?.location?.pathname === '/login/') {
      return;
    }
    setRedirect(window?.location?.pathname ?? '/');
  }, []);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Styled.Wrapper>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/create-post">Create Posts</Link>
      {session ? (
        <a href="#" onClick={handleClick}>
          Sair
        </a>
      ) : (
        <>
          <Link href={{ pathname: '/login', query: { redirect } }}>Login</Link>
          <Link
            href={{
              pathname: '/singin',
            }}
          >
            SingIn
          </Link>
        </>
      )}
    </Styled.Wrapper>
  );
};
