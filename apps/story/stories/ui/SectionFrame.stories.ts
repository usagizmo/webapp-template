import SectionFrameView from './views/SectionFrameView.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/svelte/writing-stories/introduction
const meta = {
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
} satisfies Meta<SectionFrameView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Default: Story = {
  args: {},
};

export const noPadY: Story = {
  args: {
    noPad: 'y',
  },
};

export const noPadTop: Story = {
  args: {
    noPad: 'top',
  },
};
