import type { ReactElement } from 'react'
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout/Layout'
import type { NextPageWithLayout } from '@/types'
import { AuthorizedContent } from './components/AuthorizedContent'
import { LoginFields } from './components/LoginFields'
import { useTab } from './components/useTab'

const usePage = () => {
  const { isAuthenticated } = useAuthenticationStatus()
  const user = useUserData()
  const { Tab, tabId } = useTab()

  return {
    isAuthenticated,
    user,
    Tab,
    tabId,
  }
}

const Page: NextPageWithLayout = () => {
  const { isAuthenticated, user, Tab, tabId } = usePage()

  return (
    <>
      <NextSeo title="Admin" />
      <main className="container max-w-2xl">
        {!isAuthenticated && (
          <div className="mb-6">
            <Tab />
          </div>
        )}
        {user ? (
          <AuthorizedContent user={user} />
        ) : (
          <LoginFields type={tabId} />
        )}
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
