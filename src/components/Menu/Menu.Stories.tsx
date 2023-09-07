import { Meta, StoryFn } from '@storybook/react/';
import { Menu } from '.';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const Template: StoryFn = (args) => {
  return (
    <div>
      <Menu {...args} />
    </div>
  );
};
