import type { FC } from 'react'
import type { ArticlesQuery } from 'generated/dist/graphql'
import { ArticleImage } from './ArticleImage'

type Props = {
  article: ArticlesQuery['articles'][0]
}

export const ArticleItem: FC<Props> = ({ article }) => {
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
