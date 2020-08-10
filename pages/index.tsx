import Head from 'next/head'
import Sample from '../src/components/sample/sample'

const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Nextjs Template</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Sample text="Nextjs Template" />
    </main>
  </div>
)

export default Home
