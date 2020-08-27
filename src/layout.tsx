import React, { FC } from 'react'
import Head from 'next/head'

import { Router } from 'next/router'

interface Props {
  router: Router
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nextjs Template</title>
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
