import type { FC } from 'react'
import Image from 'next/image'
import type { ArticleImageFIle } from 'types/data-types'

type Props = {
  imageFile: ArticleImageFIle
}

export const ArticleImage: FC<Props> = ({ imageFile }) => {
  return (
    <div>
      <div className="flex h-[120px] w-[120px] items-center justify-center border bg-gray-50">
        <Image
          src={imageFile.url}
          alt={imageFile.name}
          className="max-h-full max-w-full"
        />
      </div>
      <p className="text-[14px]">{imageFile.name}</p>
    </div>
  )
}
