/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gqlClient } from '../../../graphql/client';
import { GQL_MUTATION_AUTHENTICATE_USER } from '../../../graphql/mutations/auth';

import type { NextAuthOptions } from 'next-auth';

type LoginResStrapi = {
  login: {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
};
type NextAuthBaseForStrapi = {
  user?: { name?: string; email?: string; image?: string };
  id: string;
  jwt: string;
  name: string;
  email: string;
  expiration: number;
};
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email or Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (
          !credentials.email ||
          credentials.email.length < 3 ||
          !credentials.password ||
          credentials.password.length < 3
        )
          return;
        try {
          const { login } = await gqlClient.request<LoginResStrapi>(
            GQL_MUTATION_AUTHENTICATE_USER,
            { email: credentials.email, password: credentials.password },
          );

          const { jwt, user } = login;
          const { id, username, email } = user;

          if (!id || !username || !email || !jwt) {
            return null;
          }

          return {
            jwt,
            id,
            name: username,
            email,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jwt: async ({
      token,
      user,
    }: {
      token: NextAuthBaseForStrapi;
      user: NextAuthBaseForStrapi;
    }) => {
      // TUDO ISSO E PARA PERSISTIR OS DADO DO USER NO TOKEN
      const isSignIn = user ? true : false;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      //DEVE SER O MESMO TEMPO DO STRIPE
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.jwt || !user.name || !user.email || !user.id) {
          return Promise.resolve({});
        }
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      }
      if (!token?.expiration) return Promise.resolve({});
      if (actualDateInSeconds > token.expiration) return Promise.resolve({});

      return Promise.resolve(token);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    session: async ({
      session,
      token,
    }: {
      token: NextAuthBaseForStrapi;
      session: NextAuthBaseForStrapi;
    }) => {
      if (
        !token.id ||
        !token.jwt ||
        !token.expiration ||
        !token.name ||
        !token.email
      ) {
        return null;
      }

      if (session.user.image === undefined) {
        session.user.image = '/assets/images/no-image.jpg';
      }

      session.id = token.id;
      session.jwt = token.jwt;
      session.expiration = token.expiration;

      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
