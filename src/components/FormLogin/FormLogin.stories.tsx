import { Meta, StoryFn } from '@storybook/react/';
import { FormLogin, FormLoginProps } from '.';

export default {
  title: 'FormLogin',
  component: FormLogin,
} as Meta<FormLoginProps>;

export const Template: StoryFn<FormLoginProps> = (args) => {
  return (
    <div>
      <FormLogin {...args} />
    </div>
  );
};
export const WithError: StoryFn<FormLoginProps> = (args) => {
  return (
    <div>
      <FormLogin {...args} />
    </div>
  );
};
WithError.args = {
  errorMessage: 'Login ou Senha Invalida',
};
