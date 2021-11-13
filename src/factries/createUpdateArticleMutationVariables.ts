import { UpdateArticleMutationVariables } from '../generated/graphql'
import { Article } from '../types/dataTypes'

const createUpdateArticleMutationVariables = (
  article: Article
): UpdateArticleMutationVariables => ({
  id: article.id,
  title: article.title,
  content: article.content,
  imageFile: article.imageFile ?? null,
})

export default createUpdateArticleMutationVariables
