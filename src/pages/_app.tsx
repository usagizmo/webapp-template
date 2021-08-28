import { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useAuthStateChanged } from '../hooks/useAuthStateChanged'
import { useUserChanged } from '../hooks/useUserChanged'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useAuthStateChanged()
  useUserChanged()
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
