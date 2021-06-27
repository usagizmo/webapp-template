import { NextPage } from 'next'
import Head from 'next/head'
import { flex } from '../styles/flex'
import { size } from '../styles/size'

interface Props {}

const _404Page: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>404 Not Found - Next.js Template</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main css={[flex.center, size.h('100%')]}>
        <h1
          css={[
            flex.center,
            {
              height: 64,
              marginRight: 24,
              paddingRight: 24,
              borderRight: '1px solid #888',
              fontSize: 18,
            },
          ]}
        >
          404
        </h1>
        <p css={{ fontSize: 14 }}>This page could not be found.</p>
      </main>
    </>
  )
}

export default _404Page
