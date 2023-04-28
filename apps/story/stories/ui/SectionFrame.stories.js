import SectionFrameView from './views/SectionFrameView.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
  title: 'ui/SectionFrame',
  component: SectionFrameView,
  tags: ['autodocs'],
  argTypes: {
    noPad: {
      table: {
        type: { summary: `y|top|` },
        defaultValue: { summary: '' },
      },
      control: {
        type: 'select',
      },
      options: ['', 'y', 'top'],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default = {
  args: {},
};

export const noPadY = {
  args: {
    noPad: 'y',
  },
};

export const noPadTop = {
  args: {
    noPad: 'top',
  },
};
