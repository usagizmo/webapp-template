import type { Meta, StoryObj } from '@storybook/svelte';
import ButtonView from './views/ButtonView.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
  title: 'ui/Button',
  component: ButtonView,
  tags: ['autodocs'],
  argTypes: {
    href: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'text',
      },
    },
    type: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'text',
      },
    },
    primary: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    blank: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<ButtonView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Secondary: Story = {
  args: {},
};
