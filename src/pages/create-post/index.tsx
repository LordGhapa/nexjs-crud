import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '../../utils/front-end-redirect';
import { Wrapper } from '../../components/Wrapper';
import { FormPost } from '../../components/FormPost';
import { GQL_MUTATION_CREATE_POST } from '../../graphql/mutations/posts';
import { gqlClient } from '../../graphql/client';
import { newSession } from '../posts';
import { getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { authOptions } from '../api/auth/[[...nextauth]]';
import { SSRedirect } from '../../utils/SSRedirect';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: newSession = await getServerSession(
    ctx.req,
    ctx.res,
    authOptions,
  );

  // mandando para pagina de login caso nao esteja logado
  if (!session) {
    return SSRedirect('/posts');
  }
  return {
    props: {
      session,
    },
  };
};

export default function CreatePost() {
  const router = useRouter();
  const { data: Session, status } = useSession();
  const [error, setError] = useState('');
  if (status === 'loading') return null;
  if (!Session) {
    frontEndRedirect();
  }
  const handleSave = async ({ attributes: { title, auth_text } }) => {
    if (title.trim().length < 3 || auth_text.trim().length < 3) {
      setError('Title and Content should have more than 3 digits');
      return;
    }
    try {
      await gqlClient.request(
        GQL_MUTATION_CREATE_POST,
        {
          name: title,
          auth_text,
        },
        {
          // @ts-ignore
          Authorization: `Bearer ${Session.jwt}`,
        },
      );
      router.push('/posts');
    } catch (e) {
      console.error('erro ao tentar criar um post');
    }
  };
  return (
    <Wrapper>
      <h2>Criando Post</h2>
      <FormPost onSave={handleSave} errorMessage={error} />
    </Wrapper>
  );
}
