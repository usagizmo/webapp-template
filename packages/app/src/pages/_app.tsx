import React from 'react'
import { AppProps } from 'next/app'

import FLayout from '../foundations/f-layout'
import FProviders from '../foundations/f-providers'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <FProviders pageProps={pageProps}>
      <FLayout router={router}>
        <Component {...pageProps} />
      </FLayout>
    </FProviders>
  )
}

export default MyApp
