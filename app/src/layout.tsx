import React, { FC } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'

// import useTypekit from '../plugins/typekit/use-typekit'
import useScrollYEmitter from '../plugins/scroll/use-scroll-y-emitter'
import useWindowSizeProvider from '../plugins/window-size/use-window-size-provider'
// import PGtag from '../plugins/p-gtag'
import useBodyProvider from '../plugins/use-body-provider'

interface Props {
  router: Router
}

const Layout: FC<Props> = ({ children }) => {
  // useTypekit('abcdefg')
  useScrollYEmitter()
  useWindowSizeProvider()
  useBodyProvider()

  return (
    <>
      <Head>
        <meta property="og:site_name" content="Next.js Template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextjs-template" />
        <link rel="icon" href="/favicon.ico" />
        {/*<PGtag uid="UA-12345678-9" />*/}
      </Head>
      {children}
    </>
  )
}

export default Layout
