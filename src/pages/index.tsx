import React from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { CaretDoubleRight } from 'phosphor-react'
import Layout from '../components/Layout'
import LoginFields from '../components/LoginFields'
import useAuthStore from '../store/useAuthStore'
import ROUTE from '../constants/route'
import PageTitle from '../components/PageTitle'

interface Props {}

const HomePage: NextPage<Props> = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <Layout title="Home">
      <PageTitle title="Home" />
      <div className="container">
        <div className="u-flex-center">
          <Link href={{ pathname: ROUTE['SECOND[ID]'], query: { id: 1 } }} passHref>
            <a className="underline">Second</a>
          </Link>
        </div>
        <div className="mt-[24px]">
          <LoginFields />
        </div>
        {user && (
          <div className="py-[24px]">
            <Link href={ROUTE.DASHBOARD} passHref>
              <a className="u-flex-center space-x-[8px]">
                <CaretDoubleRight size={24} className="text-blue-500" />
                <span>Dashboard</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default HomePage
