import type { FC } from 'react'
import type { ArticlesQuery } from 'generated/dist/graphql'
import { ArticleItem } from './ArticleItem'

type Props = {
  articles: ArticlesQuery['articles']
}

export const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
