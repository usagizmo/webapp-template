import React, { FC } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'
import useScrollYEmitter from '../plugins/use-scroll-y-emitter'
import useWindowSizeProvider from '../plugins/window-size/use-window-size-provider'

interface Props {
  router: Router
}

const Layout: FC<Props> = ({ children }) => {
  // useTypekit('abcdefg')
  useScrollYEmitter()
  useWindowSizeProvider()

  return (
    <>
      <Head>
        <meta property="og:site_name" content="Nextjs Template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextjs-template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Layout
