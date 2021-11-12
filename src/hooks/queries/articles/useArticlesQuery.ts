import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { gql } from 'graphql-request'
import { Article, returnArticleProps } from '../../../types/dataTypes'
import QUERY_KEY from '../../../constants/query-key'
import useStore from '../../../store/useStore'

const GET_ARTICLES = gql`
  query GetArticles {
    articles(order_by: { created_at: desc }) {
      ${returnArticleProps}
    }
  }
`

interface QueryResult {
  articles: Article[]
}

export const useArticlesQuery = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)

  const fetchArticles = useCallback(async () => {
    return (await graphQLClient.request<QueryResult>(GET_ARTICLES)).articles
  }, [graphQLClient])

  return useQuery<Article[], Error>({
    queryKey: QUERY_KEY.ARTICLES,
    queryFn: fetchArticles,
    staleTime: Infinity,
  })
}
