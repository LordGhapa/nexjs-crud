import React from 'react';
import { Wrapper } from '../components/Wrapper';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { data: Session, status } = useSession();
  if (status === 'loading') return null;

  return (
    <>
      <Wrapper>
        {!Session ? <h2>Acesso negado</h2> : <h2>Autorizado</h2>}
        <h1>
          Ola{' '}
          {Session?.user?.name || 'Desconhecido faça login ou crie uma conta'}
        </h1>
      </Wrapper>
    </>
  );
}
