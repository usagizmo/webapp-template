import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '@/styles/globals.css'

export default function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
