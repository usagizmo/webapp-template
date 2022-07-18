import type { FC, ReactNode } from 'react'
import type { NhostSession } from '@nhost/nextjs'
import { NhostNextProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { CONST } from 'constants/const'
import { useAtomsDebugValue } from 'jotai/devtools'
import { DefaultSeo } from 'next-seo'
import { staticPath } from '@/lib/$path'
import { nhost } from '@/lib/nhost'
import { GoogleAnalytics } from './GoogleAnalytics/GoogleAnalytics'

type Props = {
  nhostSession: NhostSession
  children: ReactNode
}

const useProviders = () => {
  useAtomsDebugValue()
}

export const Providers: FC<Props> = ({ nhostSession, children }) => {
  useProviders()
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
      <NhostNextProvider nhost={nhost} initial={nhostSession}>
        <NhostApolloProvider nhost={nhost}>{children}</NhostApolloProvider>
      </NhostNextProvider>
    </>
  )
}
