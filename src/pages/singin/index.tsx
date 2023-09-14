import { useState } from 'react';

import { Wrapper } from '../../components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormCreateUser } from '../../components/FormCreateUser';

import * as EmailValidator from 'email-validator';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_REGISTE_NEW_USER } from '../../graphql/mutations/auth';
import { Loading } from '../../templates/Loading';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!response.ok) {
      setError('apos criar a conta nao foi possível fazer o login');
      return;
    }
    setLoading(false);
    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };

  const handleSingin = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setError('');

    const erros = [];
    const isValidEmail = EmailValidator.validate(email);

    if (name.length < 3) {
      erros.push('Name must have 3 or more digits');
    }
    if (!isValidEmail) {
      erros.push('Enter a valid email address');
    }
    if (password.length < 6) {
      erros.push('Password must have more than 6 digits');
    }
    if (erros.length) {
      setError(erros.join(' | '));
      return;
    }
    try {
      const createUser: { register: { jwt: string } } = await gqlClient.request(
        GQL_MUTATION_REGISTE_NEW_USER,
        {
          username: name,
          email,
          password,
        },
      );

      if (createUser.register.jwt) handleLogin(email, password);
    } catch (e) {
      const emailAlreadyExists = e.message.includes('already taken')
        ? 'Email já existe'
        : '';
      setError(`Não foi possível cria a conta ${emailAlreadyExists}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <h2>SingIn</h2>
          <FormCreateUser onSingin={handleSingin} errorMessage={error} />
        </Wrapper>
      )}
    </>
  );
}
