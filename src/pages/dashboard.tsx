import { VFC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LogoutIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline'
import { useLogout } from '../hooks/useLogout'
import ROUTE from '../constants/route'
import Layout from '../components/Layout'
import UserList from '../components/UserList'
import useAuthStore from '../store/useAuthStore'
import PageTitle from '../components/PageTitle'

const Dashboard: VFC = () => {
  const router = useRouter()
  const { logout } = useLogout()
  const user = useAuthStore((state) => state.user)

  return (
    <Layout title="Dashboard">
      <PageTitle title="Dashboard" />
      {user && (
        <>
          <div className="container">
            <p className="py-6 flex-center flex-col">
              <span className="font-semibold font-mono px-1 py-0.5">{user.email}</span>
              <span className="font-mono px-1 py-0.5">{user.id}</span>
            </p>
          </div>
          <div className="container">
            <div className="max-w-sm mx-auto">
              <UserList />
            </div>
          </div>
        </>
      )}
      <div className="flex-center space-x-2 mt-8">
        <Link href={ROUTE.HOME}>
          <a>
            <ChevronDoubleLeftIcon className="h-5 w-5 text-blue-500" />
          </a>
        </Link>
        <button
          onClick={() => {
            logout()
            router.push(ROUTE.HOME)
          }}
        >
          <LogoutIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>
    </Layout>
  )
}

export default Dashboard
