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
      {article.imageURL && (
        <div className="w-[120px] h-[120px] border u-flex-center bg-gray-50">
          <img src={article.imageURL} alt="" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  )
}

export default ArticleItem
