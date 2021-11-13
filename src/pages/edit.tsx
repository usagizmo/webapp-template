import { useRouter } from 'next/router'
import React, { useEffect, VFC } from 'react'
import CreateArticleItem from '../components/Article/CreateArticleItem'
import EditArticleList from '../components/Article/EditArticleList'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import CONST from '../constants/const'
import ROUTE from '../constants/route'
import useStore from '../store/useStore'

interface Props {}

const EditPage: VFC<Props> = () => {
  const router = useRouter()
  const user = useStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push(ROUTE.HOME)
    }
  }, [router, user])

  return (
    <Layout>
      <header className="u-flex-center h-[80px]">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-[24px]">
          <CreateArticleItem />
        </div>
        <div className="mt-[24px]">
          <EditArticleList />
        </div>
      </div>
    </Layout>
  )
}

export default EditPage
