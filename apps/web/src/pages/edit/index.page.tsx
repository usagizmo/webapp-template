import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { useArticlesQuery } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from '@/components/Layout/Layout'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { pagesPath } from '@/lib/$path'
import type { NextPageWithLayout } from '@/types'
import { CreateArticleItem } from './components/CreateArticleItem'
import { EditArticleList } from './components/EditArticleList'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const usePage = () => {
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

const Page: NextPageWithLayout<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = usePage()

  return (
    <>
      <NextSeo title="Edit" />
      <main className="container max-w-lg">
        <CreateArticleItem />
        <div className="mt-6">
          {articlesQueryHandle ?? (
            <EditArticleList articles={articlesQuery.data?.articles ?? []} />
          )}
        </div>
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

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

export default Page
