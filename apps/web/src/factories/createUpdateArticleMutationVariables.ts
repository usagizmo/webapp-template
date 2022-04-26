import type {
  ArticlesQuery,
  UpdateArticleMutationVariables,
} from 'generated/dist/graphql'

export const createUpdateArticleMutationVariables = (
  article: ArticlesQuery['articles'][0]
): UpdateArticleMutationVariables => ({
  id: article.id,
  title: article.title,
  content: article.content,
  imageFile: article.imageFile ?? null,
})
