import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Trash } from 'phosphor-react'
import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
)

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = Template.bind({})
Default.args = {}

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}

export const Black = Template.bind({})
Black.args = {
  black: true,
}

export const Icon = Template.bind({})
Icon.args = {
  icon: true,
  children: <Trash width={16} height={16} />,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
