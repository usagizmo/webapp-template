import { Meta, Story } from '@storybook/react'
import { Props, Button } from './button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'ui/Button',
  component: Button,
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<Props> = (args) => (
  <Button {...args}>
    <span>Button</span>
  </Button>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
}

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
  primary: true,
  disabled: true,
}

export const Secondary = Template.bind({})
Secondary.args = {}

export const SecondaryDisabled = Template.bind({})
SecondaryDisabled.args = {
  disabled: true,
}
