import ButtonView from './views/ButtonView.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
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
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = {
  args: {
    primary: true,
  },
};

export const Secondary = {
  args: {},
};
