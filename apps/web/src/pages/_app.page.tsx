import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from '@/types'
import { Providers } from './components/Providers'

import 'tailwind-preset/globals.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Providers session={session} dehydratedState={dehydratedState}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  )
}
