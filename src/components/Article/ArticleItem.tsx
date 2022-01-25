import React, { VFC } from 'react'
import { Article } from '../../types/dataTypes'
import ArticleImage from './ArticleImage'

interface Props {
  article: Article
}

const ArticleItem: VFC<Props> = ({ article }) => {
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

export default ArticleItem
