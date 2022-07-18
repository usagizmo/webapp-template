import type { FC } from 'react'
import { useMemo } from 'react'
import { formatRelative } from 'date-fns'

export type CommentType = {
  id: string
  comment: string
  user: {
    id: string
    displayName: string
  }
  created_at: string
  updated_at: string
}

type Props = {
  comment: CommentType
}

export const Comment: FC<Props> = ({ comment }) => {
  const date = useMemo(() => new Date(comment.created_at), [comment.created_at])

  return (
    <div className="py-4">
      <h3 className="font-medium text-gray-900">{comment.user.displayName}</h3>
      <p>
        <time dateTime={comment.created_at}>
          {formatRelative(date, new Date())}
        </time>
      </p>
      <div className="mt-4 text-sm text-gray-500">
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}
