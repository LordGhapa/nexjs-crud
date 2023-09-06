import React from 'react';
import Home from '../templates/Home';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
export default function Index() {
  const { data: session, status } = useSession();
  // console.log('session', session);
  // console.log('status', status);

  return (
    <>
      {' '}
      <h1>
        {session ? 'TO LOGADO' : 'TENHO QUE LOGAR'}
        <button>
          <Link href="http://localhost:3000/api/auth/signin/">LOGIN</Link>
        </button>
        <button>
          <Link href="http://localhost:3000/api/auth/signout/">SING OUT</Link>
        </button>
        <br />
        {JSON.stringify(session, null, 4)}
        <br />
        <br />
        {JSON.stringify(status, null, 2)}
      </h1>
      <Home />;
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
