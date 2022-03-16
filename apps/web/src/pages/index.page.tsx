import { VFC } from 'react'
import { InferGetStaticPropsType } from 'next'
import { QueryClient, dehydrate } from 'react-query'
import { ArticleList } from '@/components/Article/ArticleList'
import { Layout } from '@/components/Layout'
import { Navigation } from '@/components/Navigation'
import { CONST } from '@/constants/const'
import { useArticlesQuery } from '@/generated/graphql'
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

const HomePage: VFC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const articlesQueryHandle = useQueryHandle(articlesQuery)

  return (
    <Layout>
      <header className="flex h-20 items-center justify-center">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-6">
          {articlesQueryHandle ?? (
            <ArticleList articles={articlesQuery.data?.articles ?? []} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
