import type { FC } from 'react'
import type { CommentType } from './Comment'
import { Comment } from './Comment'

type Props = {
  comments: CommentType[]
}

export const Comments: FC<Props> = ({ comments }) => {
  return (
    <div className="divide-y divide-gray-200 px-4 md:px-8">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
