import { VFC } from 'react'
import { useArticlesQuery } from '@/generated/graphql'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { Article } from '@/types/data-types'
import { ArticleItem } from './article-item'

interface Props {}

export const ArticleList: VFC<Props> = () => {
  const articlesQuery = useArticlesQuery()
  const queryHandle = useQueryHandle(articlesQuery)

  if (queryHandle) return queryHandle

  return (
    <div className="space-y-[24px]">
      {articlesQuery.data?.articles.map((article) => (
        <ArticleItem key={article.id} article={article as Article} />
      ))}
    </div>
  )
}
