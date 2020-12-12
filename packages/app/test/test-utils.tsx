import { FC } from 'react'
import { NextRouter } from 'next/router'
import { render, RenderResult } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import Providers from '../src/foundations/f-providers'

type DefaultParams = Parameters<typeof render>
type RenderUI = DefaultParams[0]
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> }

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

interface Props {
  pageProps: any
}

const customRender = (ui: RenderUI, { router, ...options }: RenderOptions = {}): RenderResult => {
  const wrapper: FC<Props> = ({ children, pageProps }) => {
    return (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <Providers pageProps={pageProps}>{children}</Providers>
      </RouterContext.Provider>
    )
  }
  return render(ui, { wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
