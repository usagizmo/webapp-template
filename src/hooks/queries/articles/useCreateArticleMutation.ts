import { useMutation, useQueryClient } from 'react-query'
import { gql } from 'graphql-request'
import QUERY_KEY from '../../../constants/query-key'
import createCreateArticleProps from '../../../factries/createCreateArticleProps'
import useStore from '../../../store/useStore'
import { Article, CreateArticleProps, returnArticleProps } from '../../../types/dataTypes'

const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!, $imageURL: String!) {
    insert_articles_one(object: { title: $title, content: $content, imageURL: $imageURL }) {
      ${returnArticleProps}
    }
  }
`

interface QueryResult {
  insert_articles_one: Article
}

export const useCreateArticleMutation = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)
  const queryClient = useQueryClient()

  return useMutation(
    (props: CreateArticleProps) =>
      graphQLClient.request(CREATE_ARTICLE, createCreateArticleProps(props)),
    {
      onSuccess: (data: QueryResult) => {
        const previousArticles = queryClient.getQueryData<Article[]>(QUERY_KEY.ARTICLES)
        if (!previousArticles) return

        queryClient.setQueryData(QUERY_KEY.ARTICLES, [
          data.insert_articles_one,
          ...previousArticles,
        ])
      },
    }
  )
}
