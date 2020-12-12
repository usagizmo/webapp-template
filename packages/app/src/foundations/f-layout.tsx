import React, { FC } from 'react'
import Head from 'next/head'
import { Router } from 'next/router'

import useHScreenFixed from '../plugins/use-h-screen-fixed'
import useBodyProvider from '../plugins/use-body-provider'
import useMouseOnWindowEmitter from '../plugins/mouse-on-window/use-mouse-on-window-emitter'
import LHeader from '../layouts/l-header'
import LFooter from '../layouts/l-footer'
import CCursor from '../components/c-cursor'
// import PGtag from '../plugins/p-gtag'
// import useAnimationFrameEmitter from './plugins/animation-frame/use-animation-frame-emitter'
// import useScrollRestorationManual from './plugins/use-scroll-restoration-manual'
// import useTypekit from '../plugins/typekit/use-typekit'
// import { useSWRSettings } from '../hooks/use-custom-swr'
// import useStore from '../store'

interface Props {
  router: Router
}

const FLayout: FC<Props> = ({ children }) => {
  // useAnimationFrameEmitter()
  // useScrollRestorationManual()
  // useTypekit('abcdefg')
  useBodyProvider()
  useMouseOnWindowEmitter()
  useHScreenFixed()

  // const updatePostsPerPage = useStore((state) => state.actions.updatePostsPerPage)
  // const { data: settings } = useSWRSettings()

  // useEffect(() => {
  //   if (!settings) {
  //     return
  //   }
  //   updatePostsPerPage(settings.readingSettings.postsPerPage)
  // }, [settings, updatePostsPerPage])

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
      <div className="flex flex-col h-screen-fixed">
        <div>
          <LHeader text="Next.js Template" />
        </div>
        <div className="flex-1">{children}</div>
        <div>
          <LFooter />
        </div>
      </div>
      <CCursor />
    </>
  )
}

export default FLayout
