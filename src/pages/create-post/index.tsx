import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '../../utils/front-end-redirect';
import { Wrapper } from '../../components/Wrapper';
import { FormPost } from '../../components/FormPost';
import { GQL_MUTATION_CREATE_POST } from '../../graphql/mutations/posts';
import { gqlClient } from '../../graphql/client';
import { newSession } from '../posts';
import { getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { SSRedirect } from '../../utils/SSRedirect';
import { useRouter } from 'next/router';

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
  if (status === 'loading') return null;
  if (!Session) {
    frontEndRedirect();
  }
  const handleSave = async ({ attributes: { title, auth_text } }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_CREATE_POST,
        {
          name: title,
          auth_text,
        },
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Authorization: `Bearer ${Session.jwt}`,
        },
      );
    } catch (e) {
      console.error('erro ao tentar criar um post');
    } finally {
      router.push('/posts');
    }
  };
  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
}
