import React, { FC } from 'react'
import { useArticlesQuery, useUpdateArticlesTitleMutation } from '@nextjs-template/graphql'

interface Props {}

const CApollo: FC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const [updateArticlesTitle] = useUpdateArticlesTitleMutation()

  if (articlesQuery.loading || !articlesQuery.data) {
    return <p css={{ padding: '8px 16px', fontSize: 12 }}>Loading...</p>
  }

  const articles = articlesQuery.data.articles

  return (
    <div css={{ position: 'relative', padding: '8px 16px', fontSize: 12 }}>
      {articles.map((article) => (
        <div key={article.id}>
          <p>{JSON.stringify(article, null, 2)}</p>
          <button
            onClick={() =>
              void updateArticlesTitle({
                variables: {
                  articleId: article.id,
                  title: article.title + '!',
                },
              })
            }
          >
            !
          </button>
        </div>
      ))}
    </div>
  )
}

export default CApollo
