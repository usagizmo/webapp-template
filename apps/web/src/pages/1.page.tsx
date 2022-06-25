import type { ReactElement } from 'react'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout/Layout'
import type { NextPageWithLayout } from '@/types'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="1" />
      <main className="container max-w-2xl">
        <div>1.page.tsx</div>
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
