import { useMutation, useQueryClient } from 'react-query'
import { gql } from 'graphql-request'
import QUERY_KEY from '../../../constants/query-key'
import useStore from '../../../store/useStore'
import { Article, returnArticleProps } from '../../../types/dataTypes'

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    delete_articles_by_pk(id: $id) {
      ${returnArticleProps}
    }
  }
`

interface QueryResult {
  delete_articles_by_pk: Article
}

export const useDeleteArticleMutation = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)
  const queryClient = useQueryClient()

  return useMutation((id: string) => graphQLClient.request(DELETE_ARTICLE, { id }), {
    onSuccess: (_: QueryResult, variables) => {
      const previousArticles = queryClient.getQueryData<Article[]>(QUERY_KEY.ARTICLES)
      if (!previousArticles) return

      queryClient.setQueryData(
        QUERY_KEY.ARTICLES,
        previousArticles.filter((article) => article.id !== variables)
      )
    },
  })
}
