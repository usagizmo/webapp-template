import { Trash } from 'phosphor-react'
import React, { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { GetArticlesQuery, useDeleteArticleMutation } from '../../generated/graphql'
import { useArticleItemBindings } from '../../hooks/useArticleItemBindings'
import useQueryHandle from '../../hooks/useQueryHandle'
import { Article } from '../../types/dataTypes'
import Button from '../Button'
import InlineInput from '../InlineInput'
import ArticleImage from './ArticleImage'

interface Props {
  article: Article
}

const EditArticleItem: VFC<Props> = ({ article }) => {
  const { title, titleBindings, content, contentBindings } = useArticleItemBindings(article)
  const queryClient = useQueryClient()
  const deleteArticleMutation = useDeleteArticleMutation({
    onSuccess: (data) => {
      const previousArticles = queryClient.getQueryData<GetArticlesQuery>(['GetArticles'])
      if (!previousArticles) return

      queryClient.setQueryData(['GetArticles'], {
        ...previousArticles,
        articles: previousArticles.articles.filter(
          (article) => article.id !== data.delete_articles_by_pk?.id
        ),
      })
    },
  })
  const queryHandle = useQueryHandle(deleteArticleMutation, 'Deleting...')

  if (queryHandle) return queryHandle

  return (
    <div>
      <h2 className="flex text-[20px] font-medium">
        <InlineInput value={title} line {...titleBindings} />
        <div className="ml-[8px]">
          <Button
            className="h-[24px] w-[24px] !p-0"
            onClick={() => {
              if (confirm('Are you sure you want to delete this article?')) {
                deleteArticleMutation.mutate({ id: article.id })
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
      {article.imageFile && <ArticleImage imageFile={article.imageFile} />}
    </div>
  )
}

export default EditArticleItem
