import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { PageLoading } from './PageLoading'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/PageLoading',
  component: PageLoading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PageLoading>
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PageLoading> = (args) => (
  <PageLoading {...args} />
)

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = Template.bind({})
Default.args = {
  show: true,
  children: 'Loading...',
}
