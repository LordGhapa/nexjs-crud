import { Heading } from '.';

export default {
  title: 'Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    colorDark: { type: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Light = (args) => <Heading {...args} />;
export const Dark = (args) => <Heading {...args} />;
Dark.args = {
  children: 'texto esta claro',
  colorDark: false,
};
Light.args = {
  children: 'texto esta escuro',
  colorDark: true,
};

Light.parameters = {
  backgrounds: {
    default: 'light',
  },
};
