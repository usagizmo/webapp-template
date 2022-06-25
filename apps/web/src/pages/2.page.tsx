import type { ReactElement } from 'react'
import { NextSeo } from 'next-seo'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '../components/Layout/Layout'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="2" />
      <main className="container max-w-2xl">
        <div>2.page.tsx</div>
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
