import React from 'react'
import { AppProps } from 'next/app'

import '../../../postcss/styles.css'
import FLayout from '../foundations/f-layout'
import FProviders from '../foundations/f-providers'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <FProviders>
      <FLayout router={router}>
        <Component {...pageProps} />
      </FLayout>
    </FProviders>
  )
}

export default MyApp
