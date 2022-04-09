import { VFC } from 'react'
import { ArticlesQuery } from 'generated/dist/graphql'
import { ArticleItem } from './ArticleItem'

type Props = {
  articles: ArticlesQuery['articles']
}

export const ArticleList: VFC<Props> = ({ articles }) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
