import type { ReactElement } from 'react'
import { CommentsDocument } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { Comments } from '@/components/Comment/Comments'
import { Layout } from '@/features/layout/Layout'
import { nhost } from '@/lib/nhost'
import type { NextPageWithLayout } from '@/types'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({ comments }) => {
  return (
    <>
      <NextSeo title="Home" openGraph={{ type: 'website' /* Only Home */ }} />
      <main className="container max-w-2xl">
        <Comments comments={comments} />
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps = async () => {
  const { data } = await nhost.graphql.request(CommentsDocument)

  return {
    props: {
      comments: data.comments,
    },
    revalidate: 10,
  }
}

export default Page
