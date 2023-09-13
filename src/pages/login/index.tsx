import { useState } from 'react';
import { FormLogin } from '../../components/FormLogin';
import { Wrapper } from '../../components/Wrapper';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setError('');
    if (!email || !password) {
      setError('Preencha os campos de email e senha ');
      return;
    }
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (!response.ok) {
      setError('Email ou Senha Inválida');
      return;
    }
    const redirect = router.query?.redirect || '/';
    router.push(redirect as string);
  };

  return (
    <>
      <Wrapper>
        <h2>Login</h2>
        <FormLogin onLogin={handleLogin} errorMessage={error} />
      </Wrapper>
    </>
  );
}
