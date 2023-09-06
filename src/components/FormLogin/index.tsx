import { useState } from 'react';
import { TextInput } from '../TextInput';
import * as Styled from './styles';
import { Envelope, Password } from 'phosphor-react';
import { Button } from '../Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (loading) return;
    setLoading(true);

    e.preventDefault();

    if (onLogin) {
      await onLogin(email, password);
    }
    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        type="email"
        label="Seu e-mail"
        name="user_indentifier"
        onInputChange={(v) => setEmail(v)}
        value={email}
        icon={<Envelope />}
      />
      <TextInput
        type="password"
        label="Digite Sua Senha"
        name="user_password"
        onInputChange={(v) => setPassword(v)}
        value={password}
        icon={<Password />}
      />
      {errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? 'Aguarde...' : 'Login'}</Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
