import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { flex } from '../../styles/flex'
import { size } from '../../styles/size'

interface Props {}

const DetailPage: NextPage<Props> = () => {
  const router = useRouter()
  const { id: queryId } = router.query

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
      <main css={[size.hFull, flex.column, flex.center]}>
        <p css={{ fontSize: 18 }}>
          <code>{`detail/[id].tsx - query: { id: ${queryId} }`}</code>
        </p>
      </main>
    </>
  )
}

export default DetailPage
