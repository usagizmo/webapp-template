import React, { FC } from 'react'
import { useArticlesQuery, useUpdateArticlesTitleMutation } from '@nextjs-template/graphql'

interface Props {}

const CApollo: FC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const [updateArticlesTitle] = useUpdateArticlesTitleMutation()

  if (articlesQuery.loading || !articlesQuery.data) {
    return <p className="px-4 py-2 text-xs whitespace-pre-wrap">Loading...</p>
  }

  const articles = articlesQuery.data.articles

  return (
    <div className="px-4 py-2 text-xs whitespace-pre-wrap relative">
      {articles.map((article) => (
        <div key={article.id}>
          <p>{JSON.stringify(article, null, 2)}</p>
          <button
            className="c-btn is-outline"
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
