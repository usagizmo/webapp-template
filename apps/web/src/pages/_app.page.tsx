import type { NhostSession } from '@nhost/nextjs'
import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from '@/types'
import { Providers } from '../components/Providers'

import 'tailwind-preset/globals.css'

type AppPropsWithLayout = AppProps<{
  nhostSession: NhostSession
}> & {
  Component: NextPageWithLayout
}

export default function MyApp({
  Component,
  pageProps: { nhostSession, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Providers nhostSession={nhostSession}>
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  )
}
