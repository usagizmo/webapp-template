import React from 'react'
import { mockRouter, render } from '../../test-utils'
import DetailId from '../../../src/pages/detail/[id]'
import { ROUTE } from '../../../src/constants/route'

describe('DetailId page', () => {
  it('matches snapshot', () => {
    const router = {
      ...mockRouter,
      pathname: ROUTE.DETAIL_ID,
      query: {
        id: '1',
      },
    }
    const { asFragment } = render(<DetailId />, { router })
    expect(asFragment()).toMatchSnapshot()
  })
})
