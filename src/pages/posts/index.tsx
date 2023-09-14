/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { SSRedirect } from '../../utils/SSRedirect';
import { authOptions } from '../api/auth/[[...nextauth]]';
import { Session, getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { frontEndRedirect } from '../../utils/front-end-redirect';
import { gqlClient } from '../../graphql/client';
import { GQL_QUERY_LOAD_POST } from '../../graphql/query/posts';
import { Posts } from '../../../types/types';
import Link from 'next/link';
import { GQL_MUTATION_DELETE_POST } from '../../graphql/mutations/posts';

export type newSession = {
  id: string;
  jwt: string;
  expiration: number;
} & Session;

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
        user_id: session.id,
      },
    );

    return {
      props: {
        session,
        posts,
      },
    };
  } catch (e) {
    console.error(e);
    return SSRedirect('/404');
  }
};

export type PostsProps = {
  posts: Posts;
};
export default function PostsPage({ posts }: PostsProps) {
  const { data: Session, status } = useSession();

  if (status === 'loading') return null;
  if (!Session) {
    frontEndRedirect();
  }
  const [statePosts, setStatePosts] = useState(posts.data);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    setStatePosts(posts.data);
  }, [posts]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    if (deleting) return;

    try {
      const deleted: { posts: Posts } = await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        {
          id,
        },
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Authorization: `Bearer ${Session.jwt}`,
        },
      );

      console.log(deleted);
      setStatePosts((s) => s.filter((post) => post.id !== id));
      setDeleting(false);
    } catch (e) {
      console.error('Nao foi possível excluir este post');
      setDeleting(false);
    }
  };

  return (
    <>
      <Wrapper>
        <h1>Posts</h1>
        <h2>Criador:{Session?.user?.name?.toUpperCase()}</h2>
        {statePosts.length ? '' : <h2>Crie um post 🤗</h2>}
        {statePosts?.map((post) => (
          <p key={post?.id} style={{ fontSize: '1.6rem', display: 'flex' }}>
            <Link
              href={`/${post.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textDecoration: 'none',
              }}
            >
              <span> ❤ {post?.attributes?.title}</span>
              <span>{post?.attributes?.auth_text}</span>
            </Link>{' '}
            <button
              style={{
                all: 'unset',
                cursor: deleting ? 'default' : 'pointer',
                opacity: deleting ? 0.2 : 1,
              }}
              onClick={() => handleDelete(post.id)}
              disabled={deleting}
            >
              ❌
            </button>
          </p>
        ))}
      </Wrapper>
    </>
  );
}
