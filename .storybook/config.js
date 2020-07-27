import React from 'react'
import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

import '../src/styles.scss'
import Providers from '../src/providers'

const req = require.context('../stories', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
configure(loadStories, module)

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator((storyFn) => <Providers>{storyFn()}</Providers>)
