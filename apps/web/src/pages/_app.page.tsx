import { AppProps } from 'next/app'
import { Providers } from '@/components/Providers'

import '@/styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  return (
    <Providers session={session} dehydratedState={dehydratedState}>
      <Component {...pageProps} />
    </Providers>
  )
}
