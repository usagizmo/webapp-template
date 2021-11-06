import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { Article } from '../../types/dataTypes'
import { GET_ARTICLES } from '../../queries/queries'
import QUERY_KEY from '../../constants/query-key'
import useStore from '../../store/useStore'

interface ArticlesRes {
  articles: Article[]
}

export const useArticlesQuery = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)

  const fetchArticles = useCallback(async () => {
    return (await graphQLClient.request<ArticlesRes>(GET_ARTICLES)).articles
  }, [graphQLClient])

  return useQuery<Article[], Error>({
    queryKey: QUERY_KEY.ARTICLES,
    queryFn: fetchArticles,
    staleTime: Infinity,
  })
}
