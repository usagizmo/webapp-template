import type { FC } from 'react'
import type { ArticlesQuery } from 'generated/dist/graphql'
import { EditArticleItem } from './EditArticleItem'

type Props = {
  articles: ArticlesQuery['articles']
}

export const EditArticleList: FC<Props> = ({ articles }) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <EditArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
