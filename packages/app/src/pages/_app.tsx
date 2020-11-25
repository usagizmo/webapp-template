import React from 'react'
import { AppProps } from 'next/app'

import '../../../postcss/styles.css'
import Layout from '../layout'
import Providers from '../providers'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <Providers>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default MyApp
