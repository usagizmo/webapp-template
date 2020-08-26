import React from 'react'
import { AppProps } from 'next/app'

import '../../styles.css'
import Layout from '../layout'
import Providers from '../providers'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Providers>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default MyApp
