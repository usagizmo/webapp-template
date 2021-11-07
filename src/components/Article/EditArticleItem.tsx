import { Trash } from 'phosphor-react'
import React, { VFC } from 'react'
import { useDeleteArticleMutation } from '../../hooks/mutations/useDeleteArticleMutation'
import { useArticleItemBindings } from '../../hooks/useArticleItemBindings'
import useQueryHandle from '../../hooks/useQueryHandle'
import { Article } from '../../types/dataTypes'
import Button from '../Button'
import InlineInput from '../InlineInput'

interface Props {
  article: Article
}

const EditArticleItem: VFC<Props> = ({ article }) => {
  const { title, titleBindings, content, contentBindings } = useArticleItemBindings(article)
  const deleteArticleMutation = useDeleteArticleMutation()
  const queryHandle = useQueryHandle(deleteArticleMutation, 'Deleting...')

  if (queryHandle) return queryHandle

  return (
    <div>
      <h2 className="font-medium text-[20px] flex">
        <InlineInput value={title} line {...titleBindings} />
        <div className="ml-[8px]">
          <Button
            className="w-[24px] h-[24px] !p-0"
            onClick={() => {
              if (confirm('Are you sure you want to delete this article?')) {
                deleteArticleMutation.mutate(article.id)
              }
            }}
          >
            <Trash width={16} height={16} />
          </Button>
        </div>
      </h2>
      <div>
        <InlineInput value={content} line {...contentBindings} />
      </div>
    </div>
  )
}

export default EditArticleItem
