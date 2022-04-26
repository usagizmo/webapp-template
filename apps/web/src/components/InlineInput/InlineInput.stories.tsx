import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { InlineInput } from './InlineInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/InlineInput',
  component: InlineInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof InlineInput>
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InlineInput> = (args) => (
  <InlineInput {...args} />
)

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = Template.bind({})
Default.args = {}

export const HasValue = Template.bind({})
HasValue.args = {
  value: 'This is value',
}
