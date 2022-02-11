import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import { CONST } from '@/constants/const'

interface Props {
  children: ReactNode
  pageTitle?: string
  description?: string
}

export const Layout: VFC<Props> = ({
  children,
  pageTitle,
  description = 'Next.js Template Description',
}) => {
  const title = `${pageTitle ? pageTitle + ' | ' : ''}` + CONST.SITE_NAME
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        {/* <link rel="canonical" href="https://nextjs-template.io/" /> */}
      </Head>
      {children}
    </>
  )
}
