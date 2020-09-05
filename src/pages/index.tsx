import Head from 'next/head'
import CSample from '../components/c-sample'

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Nextjs Template</title>
        <meta name="description" content="Nextjs Template Description" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nextjs Template" />
        <meta property="og:description" content="Nextjs Template Description" />
        <meta property="og:url" content="https://nextjs-template.io" />
        <meta property="og:image" content="https://nextjs-template.io/images/ogp-fb.png" />
        <meta name="twitter:title" content="Nextjs Template" />
        <meta name="twitter:description" content="Nextjs Template Description" />
        <meta name="twitter:image" content="https://nextjs-template.io/images/ogp-tw.png" />
      </Head>
      <main>
        <CSample text="Nextjs Template" />
      </main>
    </>
  )
}

export default Home
