import { VFC } from 'react'
import { useArticlesQuery } from '../../hooks/queries/useArticlesQuery'
import useQueryHandle from '../../hooks/useQueryHandle'

interface Props {}

const ArticleList: VFC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const queryHandle = useQueryHandle(articlesQuery)
  if (queryHandle) return queryHandle

  return (
    <div className="space-y-[24px]">
      {articlesQuery.data?.map((article) => (
        <div key={article.id}>
          <h2 className="font-medium text-[20px]">{article.title}</h2>
          <div>
            <p>{article.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleList
