import { NextPage } from 'next'
import Head from 'next/head'

interface Props {}

const _404Page: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>404 Not Found - Next.js Template</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="flex items-center justify-center h-full">
        <h1 className="flex items-center h-16 pr-6 mr-6 border-r border-gray-500 text-2xl font-medium">
          404
        </h1>
        <p className="text-sm">This page could not be found.</p>
      </main>
    </>
  )
}

export default _404Page
