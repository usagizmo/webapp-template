import React, { FC } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'

// import PGtag from '../plugins/p-gtag'
// import useAnimationFrameEmitter from './plugins/animation-frame/use-animation-frame-emitter'
import useBodyProvider from '../plugins/use-body-provider'
import useMouseOnWindowEmitter from '../plugins/mouse-on-window/use-mouse-on-window-emitter'
// import useScrollRestorationManual from './plugins/use-scroll-restoration-manual'
// import useTypekit from '../plugins/typekit/use-typekit'

interface Props {
  router: Router
}

const FLayout: FC<Props> = ({ children }) => {
  // useAnimationFrameEmitter()
  useBodyProvider()
  useMouseOnWindowEmitter()
  // useScrollRestorationManual()
  // useTypekit('abcdefg')

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

export default FLayout
