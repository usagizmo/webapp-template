import Head from 'next/head'
import Node from '../src/components/node/node'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Nextjs Template</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Node text="Nextjs Template" />
    </main>
  </div>
)

export default Home
