import type { ReactElement } from 'react'
import { NextSeo } from 'next-seo'
import { withAuth } from '@/features/auth/withAuth'
import type { NextPageWithLayout } from '@/types'
import { Layout } from '../features/layout/Layout'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Secret" />
      <main className="container max-w-2xl">
        <div>secret.tsx</div>
      </main>
    </>
  )
}

const AuthPage = withAuth(Page)

AuthPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default AuthPage
