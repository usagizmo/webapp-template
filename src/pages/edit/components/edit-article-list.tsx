import { VFC } from 'react'
import { ArticlesQuery } from '@/generated/graphql'
import { EditArticleItem } from '@/pages/edit/components/edit-article-item'

type Props = {
  articles: ArticlesQuery['articles']
}

export const EditArticleList: VFC<Props> = ({ articles }) => {
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <EditArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
