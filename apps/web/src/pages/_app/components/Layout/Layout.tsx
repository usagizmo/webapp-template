import type { FC, ReactNode } from 'react'
import { CONST } from 'constants/const'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { DefaultSeo } from 'next-seo'
import { useSmoothScroll } from '@/hooks/useSmoothScroll/useSmoothScroll'
import { staticPath } from '@/lib/$path'
import { useStore } from '@/store/useStore'
import { GoogleAnalytics } from './GoogleAnalytics/GoogleAnalytics'
import { LayoutFooter } from './LayoutFooter'
import { LayoutHeader } from './LayoutHeader'
import { PageLoading } from './PageLoading/PageLoading'
import { RouteTransition } from './RouteTransition/RouteTransition'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

type Props = {
  children: ReactNode
}

const useLayout = () => {
  useSmoothScroll()
  const isPageLoading = useStore((state) => state.isPageLoading)

  return { isPageLoading }
}

export const Layout: FC<Props> = ({ children }) => {
  const { isPageLoading } = useLayout()

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
              url: staticPath.images.ogp_png,
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
      <div className="flex h-full flex-col">
        <div className="flex-1">
          <LayoutHeader />
          <div className="relative">
            <RouteTransition>{children}</RouteTransition>
          </div>
        </div>
        <LayoutFooter />
      </div>
      <PageLoading show={isPageLoading} />
    </>
  )
}
