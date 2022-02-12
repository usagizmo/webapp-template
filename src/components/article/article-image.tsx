import React, { VFC } from 'react'
import { ArticleImageFIle } from '@/types/data-types'

type Props = {
  imageFile: ArticleImageFIle
}

export const ArticleImage: VFC<Props> = ({ imageFile }) => {
  return (
    <div>
      <div className="u-flex-center h-[120px] w-[120px] border bg-gray-50">
        <img
          src={imageFile.url}
          alt={imageFile.name}
          className="max-h-full max-w-full"
        />
      </div>
      <p className="text-[14px]">{imageFile.name}</p>
    </div>
  )
}