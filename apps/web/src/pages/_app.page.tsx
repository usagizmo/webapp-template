import type { AppProps } from 'next/app'
import { Layout } from './_app/components/Layout/Layout'
import { Providers } from './_app/components/Providers'

import 'tailwind-preset/globals.css'

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
