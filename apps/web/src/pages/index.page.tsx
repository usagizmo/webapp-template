import type { ReactElement } from 'react'
import { useArticlesQuery } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { QueryClient, dehydrate } from 'react-query'
import { ArticleList } from '@/components/Article/ArticleList'
import { Layout } from '@/components/Layout/Layout'
import { NoSSR } from '@/components/NoSSR'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import type { NextPageWithLayout } from '@/types'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const usePage = () => {
  const articlesQuery = useArticlesQuery()
  const articlesQueryHandle = useQueryHandle(articlesQuery)

  return {
    articlesQuery,
    articlesQueryHandle,
  }
}

const Page: NextPageWithLayout<Props> = () => {
  const { articlesQuery, articlesQueryHandle } = usePage()
  return (
    <>
      <NextSeo title="Home" openGraph={{ type: 'website' /* Only Home */ }} />
      <main className="container max-w-2xl">
        <NoSSR>
          {articlesQueryHandle ?? (
            <ArticleList articles={articlesQuery.data?.articles ?? []} />
          )}
        </NoSSR>
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
