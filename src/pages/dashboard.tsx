import { VFC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CaretDoubleLeft, SignOut } from 'phosphor-react'
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
            <p className="py-[24px] u-flex-center flex-col">
              <span className="font-semibold font-mono px-[4px] py-[2px]">{user.email}</span>
              <span className="font-mono px-[4px] py-[2px]">{user.id}</span>
            </p>
          </div>
          <div className="container">
            <div className="max-w-sm mx-auto">
              <UserList />
            </div>
          </div>
        </>
      )}
      <div className="u-flex-center space-x-[16px] mt-[24px]">
        <Link href={ROUTE.HOME}>
          <a>
            <CaretDoubleLeft size={24} className="text-blue-500" />
          </a>
        </Link>
        <button
          onClick={() => {
            logout()
            router.push(ROUTE.HOME)
          }}
        >
          <SignOut size={24} className="text-blue-500" />
        </button>
      </div>
    </Layout>
  )
}

export default Dashboard
