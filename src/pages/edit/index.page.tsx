import { useEffect, VFC } from 'react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from '@/components/layout'
import { Navigation } from '@/components/navigation'
import { CONST } from '@/constants/const'
import { pagesPath } from '@/generated/$path'
import { useArticlesQuery } from '@/generated/graphql'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { CreateArticleItem } from '@/pages/edit/components/create-article-item'
import { EditArticleList } from '@/pages/edit/components/edit-article-list'

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

const EditPage: VFC<Props> = () => {
  const router = useRouter()
  const { status } = useSession()
  const articlesQuery = useArticlesQuery()
  const articlesQueryHandle = useQueryHandle(articlesQuery)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(pagesPath.$url())
    }
  }, [router, status])

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
