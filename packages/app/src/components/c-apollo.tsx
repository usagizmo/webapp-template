import React, { FC } from 'react'
import { useArticlesQuery } from '../plugins/graphql/generated/client'

interface Props {}

const CApollo: FC<Props> = () => {
  const articlesQuery = useArticlesQuery()

  if (articlesQuery.loading || !articlesQuery.data) {
    return <p className="px-4 py-2 text-xs whitespace-pre-wrap">Loading...</p>
  }

  const articles = articlesQuery.data.articles

  return (
    <div className="px-4 py-2 text-xs whitespace-pre-wrap">
      {articles.map((article) => (
        <p key={article.id}>{JSON.stringify(article, null, 2)}</p>
      ))}
    </div>
  )
}

export default CApollo
