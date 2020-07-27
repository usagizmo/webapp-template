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
        <meta property="og:title" content="Nextjs Template" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nextjs-template.io" />
        <meta property="og:image" content="https://nextjs-template.io/ogp.png" />
        <meta property="og:description" content="Nextjs Template" />
        <meta name="twitter:title" content="Nextjs Template" />
        <meta name="twitter:description" content="Nextjs Template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nextjs-template" />
      </Head>
      {children}
    </>
  )
}

export default Layout
