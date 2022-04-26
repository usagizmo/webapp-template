import type { FC } from 'react'
import type { ArticlesQuery } from 'generated/dist/graphql'
import {
  useArticlesQuery,
  useDeleteArticleMutation,
} from 'generated/dist/graphql'
import { Trash } from 'phosphor-react'
import { useQueryClient } from 'react-query'
import { ArticleImage } from '@/components/Article/ArticleImage'
import { Button } from '@/components/Button/Button'
import { InlineInput } from '@/components/InlineInput/InlineInput'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { useArticleItemBindings } from '../hooks/useArticleItemBindings'

type Props = {
  article: ArticlesQuery['articles'][0]
}

const useEditArticleItem = (article: ArticlesQuery['articles'][0]) => {
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

  return {
    title,
    titleBindings,
    content,
    contentBindings,
    deleteArticleMutation,
    queryHandle,
  }
}

export const EditArticleItem: FC<Props> = ({ article }) => {
  const {
    title,
    titleBindings,
    content,
    contentBindings,
    deleteArticleMutation,
    queryHandle,
  } = useEditArticleItem(article)

  if (queryHandle) return queryHandle

  return (
    <div>
      <h2 className="flex text-[20px] font-medium">
        <InlineInput value={title} {...titleBindings} />
        <div className="ml-2">
          <Button
            icon
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
        <InlineInput value={content} {...contentBindings} />
      </div>
      {article.imageFile && <ArticleImage imageFile={article.imageFile} />}
    </div>
  )
}
