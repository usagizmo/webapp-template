import type { FC } from 'react'
import type { CommentType } from './Comment'
import { Comment } from './Comment'

type Props = {
  comments: CommentType[]
}

export const Comments: FC<Props> = ({ comments }) => {
  return (
    <div className="divide-y divide-[#e2e8f0]">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
