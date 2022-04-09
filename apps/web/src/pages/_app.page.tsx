import { AppProps } from 'next/app'
import { Layout } from '@/components/Layout/Layout'
import { Providers } from '@/components/Providers'

import '@/styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  return (
    <Providers session={session} dehydratedState={dehydratedState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}
