import { Trash } from 'phosphor-react'
import React, { VFC } from 'react'
import { useQueryClient } from 'react-query'
import {
  ArticlesQuery,
  useArticlesQuery,
  useDeleteArticleMutation,
} from '@/generated/graphql'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { Button } from '@/components/button'
import { InlineInput } from '@/components/inline-input'
import { ArticleImage } from '@/components/article/article-image'
import { useArticleItemBindings } from '../hooks/use-article-item-bindings'

type Props = {
  article: ArticlesQuery['articles'][0]
}

export const EditArticleItem: VFC<Props> = ({ article }) => {
  const { title, titleBindings, content, contentBindings } =
    useArticleItemBindings(article)
  const queryClient = useQueryClient()
  const deleteArticleMutation = useDeleteArticleMutation({
    onSuccess: (data) => {
      const useArticlesQueryKey = useArticlesQuery.getKey()
      const prev = queryClient.getQueryData<ArticlesQuery>(useArticlesQueryKey)
      if (!prev) return
      queryClient.setQueryData(useArticlesQueryKey, {
        ...prev,
        articles: prev.articles.filter(
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