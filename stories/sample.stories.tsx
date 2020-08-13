import React from 'react'
import Sample from '../src/components/sample/sample'

import { storiesOf } from '@storybook/react'

storiesOf('Sample', module).add('withText', () => {
  return <Sample text="Hello Sample" />
})

storiesOf('Sample', module).add('withEmoji', () => {
  return <Sample text="😀 😎 👍 💯" />
})
