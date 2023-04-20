import { Input } from 'ui';
import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Text',
    value: 'this is value',
    error: {
      required: 'Text is required',
    },
  },
};
