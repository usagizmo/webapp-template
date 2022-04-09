import { VFC } from 'react'
import { useArticlesQuery } from 'generated/dist/graphql'
import { InferGetStaticPropsType } from 'next'
import { QueryClient, dehydrate } from 'react-query'
import { ArticleList } from 'ui'
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

const HomePage: VFC<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = useHomePage()
  return (
    <main className="container max-w-[480px]">
      {articlesQueryHandle ?? (
        <ArticleList articles={articlesQuery.data?.articles ?? []} />
      )}
    </main>
  )
}

export default HomePage
