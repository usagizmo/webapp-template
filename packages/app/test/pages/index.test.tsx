import React from 'react'
import { mockRouter, render } from '../test-utils'
import Home from '../../src/pages/index'
import { ROUTE } from '../../src/constants/route'

describe('Home page', () => {
  it('matches snapshot', () => {
    const router = {
      ...mockRouter,
      pathname: ROUTE.HOME,
    }
    const { asFragment } = render(<Home />, { router })
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />)
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
