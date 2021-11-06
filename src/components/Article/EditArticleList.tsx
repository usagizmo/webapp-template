import React, { VFC } from 'react'
import { useArticlesQuery } from '../../hooks/queries/useArticlesQuery'
import useQueryHandle from '../../hooks/useQueryHandle'
import EditArticleItem from './EditArticleItem'

interface Props {}

const EditArticleList: VFC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const queryHandle = useQueryHandle(articlesQuery)

  if (queryHandle) return queryHandle

  return (
    <div className="space-y-[24px]">
      {articlesQuery.data?.map((article) => (
        <EditArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}

export default EditArticleList
