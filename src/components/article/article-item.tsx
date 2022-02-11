import React, { VFC } from 'react'
import { Article } from '@/types/data-types'
import { ArticleImage } from './article-image'

interface Props {
  article: Article
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
