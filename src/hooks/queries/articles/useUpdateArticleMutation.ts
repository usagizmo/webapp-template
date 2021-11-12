import { useMutation, useQueryClient } from 'react-query'
import { gql } from 'graphql-request'
import QUERY_KEY from '../../../constants/query-key'
import createUpdateArticleProps from '../../../factries/createUpdateArticleProps'
import useStore from '../../../store/useStore'
import { Article, returnArticleProps, UpdateArticleProps } from '../../../types/dataTypes'

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: String!, $title: String!, $content: String!, $imageFile: jsonb) {
    update_articles_by_pk(pk_columns: { id: $id }, _set: { title: $title, content: $content, imageFile: $imageFile }) {
      ${returnArticleProps}
    }
  }
`

interface QueryResult {
  update_articles_by_pk: Article
}

export const useUpdateArticleMutation = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)
  const queryClient = useQueryClient()

  return useMutation(
    (props: UpdateArticleProps) =>
      graphQLClient.request(UPDATE_ARTICLE, createUpdateArticleProps(props)),
    {
      onSuccess: (data: QueryResult) => {
        const previousArticles = queryClient.getQueryData<Article[]>(QUERY_KEY.ARTICLES)
        if (!previousArticles) return

        queryClient.setQueryData(
          QUERY_KEY.ARTICLES,
          previousArticles.map((article) =>
            article.id === data.update_articles_by_pk.id ? data.update_articles_by_pk : article
          )
        )
      },
    }
  )
}
