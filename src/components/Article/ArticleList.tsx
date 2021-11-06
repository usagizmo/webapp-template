import { VFC } from 'react'
import { useArticlesQuery } from '../../hooks/queries/useArticlesQuery'
import useQueryHandle from '../../hooks/useQueryHandle'
import ArticleItem from './ArticleItem'

interface Props {}

const ArticleList: VFC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const queryHandle = useQueryHandle(articlesQuery)

  if (queryHandle) return queryHandle

  return (
    <div className="space-y-[24px]">
      {articlesQuery.data?.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}

export default ArticleList
