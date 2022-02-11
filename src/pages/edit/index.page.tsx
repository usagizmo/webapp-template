import { useRouter } from 'next/router'
import React, { useEffect, VFC } from 'react'
import { Layout } from '@/components/layout'
import { Navigation } from '@/components/navigation'
import { CONST } from '@/constants/const'
import { useStore } from '@/store/use-store'
import { pagesPath } from '@/generated/$path'
import { CreateArticleItem } from './components/create-article-item'
import { EditArticleList } from './components/edit-article-list'

interface Props {}

const EditPage: VFC<Props> = () => {
  const router = useRouter()
  const user = useStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push(pagesPath.$url())
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
