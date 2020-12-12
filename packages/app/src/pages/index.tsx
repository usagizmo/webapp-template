import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ROUTE } from '../constants/route'
// import CApollo from '../components/c-apollo'
// import CCustomSWR from '../components/c-custom-swr'

interface Props {}

const IndexPage: NextPage<Props> = () => {
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
      <main>
        <div className="h-full flex justify-center flex-col items-center">
          <aside className="py-2 px-4 rounded-lg border text-xs border-gray-500 whitespace-pre-wrap">
            <Link href={{ pathname: ROUTE.DETAIL_ID, query: { id: 1 } }}>Detail</Link>
          </aside>
        </div>
        {/* <CApollo /> */}
        {/* <CCustomSWR /> */}
      </main>
    </>
  )
}

export default IndexPage
