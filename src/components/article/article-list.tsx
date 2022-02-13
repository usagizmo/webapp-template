import { VFC } from 'react'
import { ArticlesQuery } from '@/generated/graphql'
import { ArticleItem } from '@/components/article/article-item'

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
