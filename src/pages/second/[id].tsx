import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import ROUTE from '../../constants/route'
import PageTitle from '../../components/PageTitle'
import { useRouter } from 'next/router'

export default function Second() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout title={`Second/${id}`}>
      <PageTitle title={`Second/${id}`} />
      <div className="container">
        <div className="flex-center">
          <Link href={ROUTE.HOME} passHref>
            <a className="underline">HOME</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
