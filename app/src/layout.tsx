import React, { FC } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'

// import useTypekit from '../plugins/typekit/use-typekit'
import useScrollTopEmitter from './plugins/scroll/use-scroll-top-emitter'
// import useScrollRestorationManual from './plugins/use-scroll-restoration-manual'
import useWindowSizeProvider from './plugins/window-size/use-window-size-provider'
// import PGtag from '../plugins/p-gtag'
import useBodyProvider from './plugins/use-body-provider'

interface Props {
  router: Router
}

const Layout: FC<Props> = ({ children }) => {
  // useTypekit('abcdefg')
  // useScrollRestorationManual()
  useScrollTopEmitter()
  useWindowSizeProvider()
  useBodyProvider()

  return (
    <>
      <Head>
        <meta property="og:site_name" content="Next.js Template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextjs-template" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        {/*<PGtag uid="UA-12345678-9" />*/}
      </Head>
      {children}
    </>
  )
}

export default Layout
