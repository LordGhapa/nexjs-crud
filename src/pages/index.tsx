import React from 'react';
import { GetServerSideProps } from 'next';
import { Wrapper } from '../components/Wrapper';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: Session } = useSession();
  return (
    <>
      <Wrapper>
        <h1>Ola {Session?.user?.name || 'Desconhecido'}</h1>
      </Wrapper>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
