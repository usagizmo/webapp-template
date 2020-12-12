import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import LHeader from '../../layouts/l-header'
import LFooter from '../../layouts/l-footer'
import CCursor from '../../components/c-cursor'
import { ROUTE } from '../../constants/route'
// import CApollo from '../../components/c-apollo'

interface Props {
}

const DetailPage: NextPage<Props> = () => {
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
        <div className="flex flex-col h-screen">
          <div>
            <LHeader text="Next.js Template" />
            <Link href={ROUTE.HOME}>HOME</Link>
          </div>
          <div className="flex-1">{/* <CApollo /> */}</div>
          <div>
            <LFooter />
          </div>
        </div>
      </main>
      <CCursor />
    </>
  )
}

export default DetailPage
