import { UpdateArticleMutationVariables } from '../generated/graphql'
import { Article } from '../types/data-types'

export const createUpdateArticleMutationVariables = (
  article: Article
): UpdateArticleMutationVariables => ({
  id: article.id,
  title: article.title,
  content: article.content,
  imageFile: article.imageFile ?? null,
})
