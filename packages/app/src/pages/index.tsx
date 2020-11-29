import { NextPage } from 'next'
import Head from 'next/head'
import CCursor from '../components/c-cursor'
import CSample from '../components/c-sample'
// import CApollo from '../components/c-apollo'

interface Props {
  userAgent?: string
}

const IndexPage: NextPage<Props> = ({ userAgent }) => {
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
        <CSample text="Next.js Template" />
        <p className="px-4 py-2 text-xs">Your user agent: {userAgent}</p>
        {/* <CApollo /> */}
      </main>
      <CCursor />
    </>
  )
}

IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default IndexPage
