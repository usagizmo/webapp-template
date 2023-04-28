import { Input } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default = {
  args: {
    label: 'Text',
    value: 'this is value',
    error: {
      required: 'Text is required',
    },
  },
};
