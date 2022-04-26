import type { FC } from 'react'
import { useEffect } from 'react'
import { useArticlesQuery } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { pagesPath } from '@/lib/$path'
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

const EditPage: FC<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = useEditPage()

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

export default EditPage
