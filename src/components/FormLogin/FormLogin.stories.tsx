import { FormLogin } from '.';

export default {
  title: 'FormLogin',
  component: FormLogin,
};

export const Template = (args) => {
  return (
    <div>
      <FormLogin {...args} />
    </div>
  );
};
export const WithError = (args) => {
  return (
    <div>
      <FormLogin {...args} />
    </div>
  );
};
WithError.args = {
  errorMessage: 'Login ou Senha Invalida',
};
