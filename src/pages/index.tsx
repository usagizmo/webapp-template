import React from 'react'
import Link from 'next/link'
import { ChevronDoubleRightIcon } from '@heroicons/react/outline'
import Layout from '../components/Layout'
import LoginFields from '../components/LoginFields'
import useAuthStore from '../store/useAuthStore'
import ROUTE from '../constants/route'
import PageTitle from '../components/PageTitle'

export default function Home() {
  const user = useAuthStore((state) => state.user)

  return (
    <Layout title="Home">
      <PageTitle title="Home" />
      <div className="container">
        <div className="flex-center">
          <Link href={{ pathname: ROUTE['SECOND[ID]'], query: { id: 1 } }} passHref>
            <a className="underline">Second</a>
          </Link>
        </div>
        <div className="mt-8">
          <LoginFields />
        </div>
        {user && (
          <div className="py-8">
            <Link href={ROUTE.DASHBOARD} passHref>
              <a className="flex-center space-x-2">
                <ChevronDoubleRightIcon className="h-5 w-5 text-blue-500" />
                <span>Dashboard</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
