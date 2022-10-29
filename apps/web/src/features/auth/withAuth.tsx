import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { CircleNotch } from 'phosphor-react'
import type { NextPageWithLayout } from '@/types'

export const withAuth = (Component: NextPageWithLayout): NextPageWithLayout => {
  return function Auth(props: any) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()

    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <CircleNotch size={32} weight="fill" className="animate-spin" />
        </div>
      )
    }

    if (!isAuthenticated) {
      router.push('/admin')
      return null
    }

    return <Component {...props} />
  }
}
