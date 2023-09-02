import { Button } from '.';
import { At } from 'phosphor-react';
export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Botao',
    icon: <At />,
  },
};

export const Template = (args) => {
  return (
    <div>
      <Button {...args} />
    </div>
  );
};
