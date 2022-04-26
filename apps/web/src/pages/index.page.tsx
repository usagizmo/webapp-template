import type { FC } from 'react'
import { useArticlesQuery } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { QueryClient, dehydrate } from 'react-query'
import { ArticleList } from '@/components/Article/ArticleList'
import { useQueryHandle } from '@/hooks/useQueryHandle'

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

const useHomePage = () => {
  const articlesQuery = useArticlesQuery()
  const articlesQueryHandle = useQueryHandle(articlesQuery)

  return {
    articlesQuery,
    articlesQueryHandle,
  }
}

const HomePage: FC<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = useHomePage()
  return (
    <>
      <NextSeo title="Home" openGraph={{ type: 'website' /* Only Home */ }} />
      <main className="container max-w-lg">
        {articlesQueryHandle ?? (
          <ArticleList articles={articlesQuery.data?.articles ?? []} />
        )}
      </main>
    </>
  )
}

export default HomePage
