import React, { VFC } from 'react'
import { ArticlesQuery } from '@/generated/graphql'
import { ArticleImage } from './article-image'

interface Props {
  article: ArticlesQuery['articles'][0]
}

export const ArticleItem: VFC<Props> = ({ article }) => {
  return (
    <div>
      <h2 className="flex text-[20px] font-medium">{article.title}</h2>
      <div>
        <p>{article.content}</p>
      </div>
      {article.imageFile && <ArticleImage imageFile={article.imageFile} />}
    </div>
  )
}
