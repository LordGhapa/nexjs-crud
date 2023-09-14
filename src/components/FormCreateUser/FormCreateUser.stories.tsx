import { FormCreateUser } from '.';

export default {
  title: 'FormCreateUser',
  component: FormCreateUser,
};

export const Template = (args) => {
  return (
    <div>
      <FormCreateUser {...args} />
    </div>
  );
};
export const WithError = (args) => {
  return (
    <div>
      <FormCreateUser {...args} />
    </div>
  );
};
WithError.args = {
  errorMessage: 'Login ou Senha Invalida',
};
