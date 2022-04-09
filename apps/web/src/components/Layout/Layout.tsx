import { FC } from 'react'
import { CONST } from 'constants/const'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'
import { useSmoothScroll } from '@/hooks/useSmoothScroll/useSmoothScroll'
import { staticPath } from '@/lib/$path'
import { LayoutFooter } from './LayoutFooter'
import { LayoutGoogleAnalytics } from './LayoutGoogleAnalytics/LayoutGoogleAnalytics'
import { LayoutHeader } from './LayoutHeader'
import { LayoutRouteTransition } from './LayoutRouteTransition/LayoutRouteTransition'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

type Props = {}

const useLayout = () => {
  const title = CONST.SITE_NAME
  const description = 'Next.js Template Description'

  useSmoothScroll()

  return { title, description }
}

export const Layout: FC<Props> = ({ children }) => {
  const { title, description } = useLayout()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextjs-template.io/" />
        <meta
          property="og:image"
          content="https://nextjs-template.io/images/ogp.jpg"
        />
        <meta property="og:site_name" content={CONST.SITE_NAME} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://nextjs-template.io/images/ogp.jpg"
        />
        <link rel="icon" href={staticPath.favicon_ico} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={staticPath.apple_touch_icon_png}
        />
        {/* <link rel="canonical" href="https://nextjs-template.io/" /> */}
      </Head>
      <LayoutGoogleAnalytics />
      <div className="flex h-full flex-col">
        <div className="flex-1">
          <LayoutHeader />
          <div className="relative mt-6">
            <LayoutRouteTransition>{children}</LayoutRouteTransition>
          </div>
        </div>
        <LayoutFooter />
      </div>
    </>
  )
}
