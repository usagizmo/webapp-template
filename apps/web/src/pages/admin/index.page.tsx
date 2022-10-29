import type { ReactElement } from 'react'
import { useAuthenticationStatus, useUserData } from '@nhost/nextjs'
import { NextSeo } from 'next-seo'
import { Layout } from '@/components/Layout/Layout'
import type { NextPageWithLayout } from '@/types'
import { AuthorizedContent } from './components/AuthorizedContent'
import { LoginFields } from './components/LoginFields'
import { useTab } from './components/useTab'

const useHook = () => {
  const { isAuthenticated } = useAuthenticationStatus()
  const user = useUserData()
  const { Tab, activeTabId } = useTab()

  return {
    isAuthenticated,
    user,
    Tab,
    activeTabId,
  }
}

const Page: NextPageWithLayout = () => {
  const { isAuthenticated, user, Tab, activeTabId } = useHook()

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
          <LoginFields type={activeTabId} />
        )}
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
