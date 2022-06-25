import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { CONST } from 'constants/const'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { staticPath } from '@/lib/$path'
import { GoogleAnalytics } from './GoogleAnalytics/GoogleAnalytics'

type Props = {
  session: any
  dehydratedState: any
  children: ReactNode
}

const useProviders = () => {
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

  return { queryClient }
}

export const Providers: FC<Props> = ({
  session,
  dehydratedState,
  children,
}) => {
  const { queryClient } = useProviders()
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${CONST.SITE_NAME}`}
        defaultTitle={CONST.SITE_NAME}
        description={CONST.SITE_DESCRIPTION}
        openGraph={{
          type: 'article',
          site_name: CONST.SITE_NAME,
          images: [
            {
              url: 'https://nextjs-template.usagizmo.com/images/ogp.png',
              width: 1200,
              height: 630,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@usagizmo',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: staticPath.favicon_ico,
          },
          {
            rel: 'apple-touch-icon',
            href: staticPath.apple_touch_icon_png,
            sizes: '180x180',
          },
        ]}
      />
      <GoogleAnalytics />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            {children}
            <ReactQueryDevtools />
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
