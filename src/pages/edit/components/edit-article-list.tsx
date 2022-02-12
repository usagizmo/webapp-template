import React, { VFC } from 'react'
import { ArticlesQuery } from '@/generated/graphql'
import { EditArticleItem } from './edit-article-item'

type Props = {
  articles: ArticlesQuery['articles']
}

export const EditArticleList: VFC<Props> = ({ articles }) => {
  return (
    <div className="space-y-[24px]">
      {articles.map((article) => (
        <EditArticleItem key={article.id} article={article} />
      ))}
    </div>
  )
}
