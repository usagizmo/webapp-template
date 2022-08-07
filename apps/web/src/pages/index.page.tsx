import type { ReactElement } from 'react'
import { CommentsDocument } from 'generated/dist/graphql'
import type { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { Button } from '@/components/Button/Button'
import { Comments } from '@/components/Comment/Comments'
import { Frame } from '@/components/Frame/Frame'
import { Layout } from '@/components/Layout/Layout'
import { pagesPath } from '@/lib/$path'
import { nhost } from '@/lib/nhost'
import type { NextPageWithLayout } from '@/types'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({ comments }) => {
  return (
    <>
      <NextSeo title="Home" openGraph={{ type: 'website' /* Only Home */ }} />
      <div className="max-w-message container mb-5">
        <Frame>
          <div className="flex items-center justify-center p-4">
            <Link href={pagesPath.admin.$url()}>
              <a>
                <Button as="span">Log in to send a message</Button>
              </a>
            </Link>
          </div>
        </Frame>
      </div>
      <main className="max-w-message container">
        <Frame>
          <div className="px-6 pb-6">
            <div className="border-b border-[#e2e8f0] pt-2.5 pb-2">
              <p className="text-center text-sm text-[#71717a]">
                Comments will be deleted as appropriate.
              </p>
            </div>
            <div>
              <Comments comments={comments} />
            </div>
          </div>
        </Frame>
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
