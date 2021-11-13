import React, { VFC } from 'react'
import { useGetArticlesQuery } from '../../generated/graphql'
import useQueryHandle from '../../hooks/useQueryHandle'
import { Article } from '../../types/dataTypes'
import EditArticleItem from './EditArticleItem'

interface Props {}

const EditArticleList: VFC<Props> = () => {
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

export default EditArticleList
