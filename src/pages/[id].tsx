import { GetServerSideProps } from 'next';
import { FormPost } from '../components/FormPost';
import { Wrapper } from '../components/Wrapper';
import { GQL_QUERY_LOAD_POST } from '../graphql/query/posts';
import { gqlClient } from '../graphql/client';
import { Posts } from '../../types/types';
import { newSession } from './posts';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[[...nextauth]]';
import { SSRedirect } from '../utils/SSRedirect';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '../utils/front-end-redirect';
import { GQL_MUTATION_UPDATE_POST } from '../graphql/mutations/posts';
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
  try {
    const { posts }: { posts: Posts } = await gqlClient.request(
      GQL_QUERY_LOAD_POST,
      {
        id: ctx.params.id,
      },
    );

    if (posts.data.length !== 1) {
      throw new Error('nao exite este post');
    }

    return {
      props: {
        session,
        posts,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
};
export type PostPageProps = {
  posts: Posts;
};

export default function PostPage({ posts }: PostPageProps) {
  const router = useRouter();
  const { data: Session, status } = useSession();
  if (status === 'loading') return null;
  if (!Session) {
    frontEndRedirect();
  }
  const handleSave = async ({ id, attributes: { title, auth_text } }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
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
      console.error('erro ao tentar muda o post');
    } finally {
      router.push('/posts');
    }
  };
  return (
    <Wrapper>
      <h2>Editando Post</h2>
      <FormPost post={posts.data[0]} onSave={handleSave} />
    </Wrapper>
  );
}
