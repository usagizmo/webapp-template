import Head from 'next/head'
import Sample from '../components/sample/sample'

const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Nextjs Template</title>
      <meta name="description" content="Nextjs Template" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Nextjs Template" />
      <meta property="og:description" content="Nextjs Template" />
      <meta property="og:url" content="https://nextjs-template.io" />
      <meta property="og:image" content="https://nextjs-template.io/ogp.png" />
      <meta name="twitter:title" content="Nextjs Template" />
      <meta name="twitter:description" content="Nextjs Template" />
    </Head>

    <main>
      <Sample text="Nextjs Template" />
    </main>
  </div>
)

export default Home
