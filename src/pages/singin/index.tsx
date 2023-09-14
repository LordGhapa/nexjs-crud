import { useState } from 'react';

import { Wrapper } from '../../components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormCreateUser } from '../../components/FormCreateUser';

import * as EmailValidator from 'email-validator';
import { gqlClient } from '../../graphql/client';
import { GQL_MUTATION_REGISTE_NEW_USER } from '../../graphql/mutations/auth';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setError('');
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!response.ok) {
      setError('apos criar a conta nao foi possível fazer o login');
      return;
    }
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
      erros.push('Nome deve ter 3 ou mais dígitos');
    }
    if (!isValidEmail) {
      erros.push('Digite um email valido');
    }
    if (password.length < 6) {
      erros.push('Senha deve ter mais de 6 dígitos');
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
      <Wrapper>
        <h2>SingIn</h2>
        <FormCreateUser onSingin={handleSingin} errorMessage={error} />
      </Wrapper>
    </>
  );
}
