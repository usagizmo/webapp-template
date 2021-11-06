import React, { VFC } from 'react'
import { Article } from '../../types/dataTypes'

interface Props {
  article: Article
}

const ArticleItem: VFC<Props> = ({ article }) => {
  return (
    <div>
      <h2 className="font-medium text-[20px] flex">{article.title}</h2>
      <div>
        <p>{article.content}</p>
      </div>
    </div>
  )
}

export default ArticleItem
