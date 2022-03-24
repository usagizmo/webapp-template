import { useEffect, VFC } from 'react'
import { InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from '@/components/Layout'
import { Navigation } from '@/components/Navigation'
import { CONST } from '@/constants/const'
import { pagesPath } from '@/generated/$path'
import { useArticlesQuery } from '@/generated/graphql'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { CreateArticleItem } from './components/CreateArticleItem'
import { EditArticleList } from './components/EditArticleList'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    useArticlesQuery.getKey(),
    useArticlesQuery.fetcher()
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  }
}

const useEditPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const articlesQuery = useArticlesQuery()
  const articlesQueryHandle = useQueryHandle(articlesQuery)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(pagesPath.$url())
    }
  }, [router, status])

  return {
    articlesQuery,
    articlesQueryHandle,
  }
}

const EditPage: VFC<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = useEditPage()

  return (
    <Layout>
      <header className="flex h-20 items-center justify-center">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-6">
          <CreateArticleItem />
        </div>
        <div className="mt-6">
          {articlesQueryHandle ?? (
            <EditArticleList articles={articlesQuery.data?.articles ?? []} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default EditPage
