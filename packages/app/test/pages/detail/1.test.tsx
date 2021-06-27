import React from 'react'
import { render } from '../../testUtils'
import DetailPage from '../../../src/pages/detail/[id]'
import { ROUTE } from '../../../src/constants/route'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Home page', () => {
  it('matches snapshot', () => {
    useRouter.mockImplementationOnce(() => ({
      pathname: ROUTE.DETAIL_ID,
      query: { id: 1 },
    }))
    const { asFragment } = render(<DetailPage />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
