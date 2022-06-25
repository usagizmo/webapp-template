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
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'anonymous',
          },
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Source+Code+Pro:wght@400;500;600;700&display=swap',
          },
          {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp-noto.min.css',
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
