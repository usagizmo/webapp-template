import React, { VFC } from 'react'
import { ArticleImageFIle } from '../../types/dataTypes'

interface Props {
  imageFile: ArticleImageFIle
}

const ArticleImage: VFC<Props> = ({ imageFile }) => {
  return (
    <div>
      <div className="w-[120px] h-[120px] border u-flex-center bg-gray-50">
        <img src={imageFile.url} alt={imageFile.name} className="max-w-full max-h-full" />
      </div>
      <p className="text-[14px]">{imageFile.name}</p>
    </div>
  )
}

export default ArticleImage
