import React from 'react'
import { render } from '../test-utils'
import Page404 from '../../src/pages/404'

describe('Page404 page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Page404 />)
    expect(asFragment()).toMatchSnapshot()
  })
})
