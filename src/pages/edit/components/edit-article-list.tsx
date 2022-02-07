import React, { VFC } from 'react'
import { useGetArticlesQuery } from '../../../generated/graphql'
import { useQueryHandle } from '../../../hooks/use-query-handle'
import { Article } from '../../../types/data-types'
import { EditArticleItem } from './edit-article-item'

interface Props {}

export const EditArticleList: VFC<Props> = () => {
  const articlesQuery = useGetArticlesQuery()
  const queryHandle = useQueryHandle(articlesQuery)

  if (queryHandle) return queryHandle

  return (
    <div className="space-y-[24px]">
      {articlesQuery.data?.articles.map((article) => (
        <EditArticleItem key={article.id} article={article as Article} />
      ))}
    </div>
  )
}
