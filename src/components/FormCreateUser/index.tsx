import { useState } from 'react';
import { TextInput } from '../TextInput';
import * as Styled from './styles';
import { Envelope, IdentificationBadge, Password } from 'phosphor-react';
import { Button } from '../Button';
import DiscordButtonLogin from '../DiscordButtonLogin';

export type FormCreateUserProps = {
  errorMessage?: string;
  onSingin?: (name: string, email: string, password: string) => Promise<void>;
};

export const FormCreateUser = ({
  errorMessage,
  onSingin,
}: FormCreateUserProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (loading) return;
    setLoading(true);

    e.preventDefault();

    if (onSingin) {
      await onSingin(name, email, password);
    }
    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        type="text"
        label="Seu nome"
        name="user_name"
        onInputChange={(v) => setName(v)}
        value={name}
        icon={<IdentificationBadge />}
      />

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
        <Button disabled={loading}>{loading ? 'Aguarde...' : 'Criar'}</Button>
        <DiscordButtonLogin />
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};
