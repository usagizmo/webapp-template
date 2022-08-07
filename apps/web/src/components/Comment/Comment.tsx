import type { FC } from 'react'
import { useMemo } from 'react'
import { formatRelative } from 'date-fns'
import { CheckCircle } from 'phosphor-react'

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
    <div className="py-2.5">
      <div className="flex items-center justify-start">
        <div className="flex items-center justify-start">
          <h3 className="font-bold">{comment.user.displayName}</h3>
          <div className="ml-0.5">
            <CheckCircle size={20} weight="fill" />
          </div>
        </div>
        <time
          className="ml-2 text-sm text-[#71717a]"
          dateTime={comment.created_at}
        >
          {formatRelative(date, new Date())}
        </time>
      </div>
      <div className="mt-0.5">
        <p>{comment.comment}</p>
      </div>
    </div>
  )
}
