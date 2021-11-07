import { ChangeEventHandler } from 'react'
import { Article } from '../types/dataTypes'
import { useUpdateArticleMutation } from './mutations/useUpdateArticleMutation'
import useEffectedState from './useEffectedState'

export const useArticleItemBindings = (article: Article) => {
  const updateArticleMutation = useUpdateArticleMutation()

  const [title, setTitle] = useEffectedState(article.title)
  const [content, setContent] = useEffectedState(article.content)

  const titleBindings: {
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: ChangeEventHandler<HTMLTextAreaElement>
  } = {
    onChange: (e) => {
      setTitle(e.target.value)
    },
    onBlur: () => {
      if (article.title === title) return
      updateArticleMutation.mutate({
        ...article,
        title,
      })
    },
  }

  const contentBindings: {
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur: ChangeEventHandler<HTMLTextAreaElement>
  } = {
    onChange: (e) => {
      setContent(e.target.value)
    },
    onBlur: () => {
      if (article.content === content) return
      updateArticleMutation.mutate({
        ...article,
        content,
      })
    },
  }

  return {
    title,
    titleBindings,
    content,
    contentBindings,
  }
}
