import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CNavigation from '../components/c-navigation'
import { flex } from '../styles/flex'
import { size } from '../styles/size'
// import CApollo from '../components/c-apollo'
// import CCustomSWR from '../components/c-custom-swr'

interface Props {}

const IndexPage: NextPage<Props> = () => {
  const router = useRouter()
  const pathname = router.pathname

  return (
    <>
      <Head>
        <title>Next.js Template</title>
        <meta name="description" content="Next.js Template Description" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next.js Template" />
        <meta property="og:description" content="Next.js Template Description" />
        <meta property="og:url" content="https://nextjs-template.io" />
        <meta property="og:image" content="https://nextjs-template.io/images/ogp-fb.png" />
        <meta name="twitter:title" content="Next.js Template" />
        <meta name="twitter:description" content="Next.js Template Description" />
        <meta name="twitter:image" content="https://nextjs-template.io/images/ogp-tw.png" />
      </Head>
      <main css={[size.h('100%'), flex.center, flex.column]}>
        <CNavigation pathname={pathname} />
        <p css={{ marginTop: 20, fontSize: 20 }}>HOME</p>
        {/* <CApollo /> */}
        {/* <CCustomSWR /> */}
      </main>
    </>
  )
}

export default IndexPage
