import React from 'react'
import Node from '../src/components/node/node'

import { storiesOf } from '@storybook/react'

storiesOf('Node', module).add('withText', () => {
  return <Node text="Hello Node" />
})

storiesOf('Node', module).add('withEmoji', () => {
  return <Node text="😀 😎 👍 💯" />
})
