import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextLink } from './TextLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'packages/ui/TextLink',
  component: TextLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TextLink>
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextLink> = (args) => (
  <TextLink {...args}>This is TextLink</TextLink>
)

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = Template.bind({})
Default.args = {
  href: 'https://nextjs-template.usagizmo.com/',
}
