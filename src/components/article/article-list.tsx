import { VFC } from 'react'
import { ArticlesQuery } from '@/generated/graphql'
import { ArticleItem } from './article-item'

interface Props {
  articles: ArticlesQuery['articles']
}

export const ArticleList: VFC<Props> = ({ articles }) => {
  return (
    <div className="space-y-[24px]">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
