import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: Session, status } = useSession();
  if (status === 'loading') return null;

  return (
    <>
      <Wrapper>
        {!Session ? <p>Acesso negado</p> : 'ok'}
        <h1>Ola {Session?.user?.name || 'Desconhecido'}</h1>
      </Wrapper>
    </>
  );
}
