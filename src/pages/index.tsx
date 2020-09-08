import Head from 'next/head'
import CSample from '../components/c-sample'

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Next.js Tailwind</title>
        <meta name="description" content="Next.js Tailwind Description" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next.js Tailwind" />
        <meta property="og:description" content="Next.js Tailwind Description" />
        <meta property="og:url" content="https://nextjs-tailwind.io" />
        <meta property="og:image" content="https://nextjs-tailwind.io/images/ogp-fb.png" />
        <meta name="twitter:title" content="Next.js Tailwind" />
        <meta name="twitter:description" content="Next.js Tailwind Description" />
        <meta name="twitter:image" content="https://nextjs-tailwind.io/images/ogp-tw.png" />
      </Head>
      <main>
        <CSample text="Next.js Tailwind" />
      </main>
    </>
  )
}

export default IndexPage
