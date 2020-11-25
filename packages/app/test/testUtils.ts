import { render, RenderResult } from '@testing-library/react'
import Providers from '../src/providers'

const customRender = (ui: JSX.Element, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
