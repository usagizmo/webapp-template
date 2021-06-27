import React from 'react'
import { render } from '../testUtils'
import IndexPage from '../../src/pages/index'
import { ROUTE } from '../../src/constants/route'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Home page', () => {
  it('matches snapshot', () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: ROUTE.HOME,
    }))
    const { asFragment } = render(<IndexPage />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //   const { getByText } = render(<IndexPage />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
