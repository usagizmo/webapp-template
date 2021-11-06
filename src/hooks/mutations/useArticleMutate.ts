import { useMutation, useQueryClient } from 'react-query'
import QUERY_KEY from '../../constants/query-key'
import createCreateArticleProps from '../../factries/createCreateArticleProps'
import createUpdateArticleProps from '../../factries/createUpdateArticleProps'
import { CREATE_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from '../../queries/queries'
import useStore from '../../store/useStore'
import { Article, CreateArticleProps, UpdateArticleProps } from '../../types/dataTypes'

interface CreateArticleRes {
  insert_articles_one: Article
}

interface UpdateArticleRes {
  update_articles_by_pk: Article
}

interface DeleteArticleRes {
  delete_articles_by_pk: Article
}

export const useArticleMutate = () => {
  const queryClient = useQueryClient()
  const graphQLClient = useStore((state) => state.graphQLClient)

  const createArticleMutation = useMutation(
    (props: CreateArticleProps) =>
      graphQLClient.request(CREATE_ARTICLE, createCreateArticleProps(props)),
    {
      onSuccess: (data: CreateArticleRes) => {
        const previousArticles = queryClient.getQueryData<Article[]>(QUERY_KEY.ARTICLES)
        if (!previousArticles) return

        queryClient.setQueryData(QUERY_KEY.ARTICLES, [
          data.insert_articles_one,
          ...previousArticles,
        ])
      },
    }
  )

  const updateArticleMutation = useMutation(
    (props: UpdateArticleProps) =>
      graphQLClient.request(UPDATE_ARTICLE, createUpdateArticleProps(props)),
    {
      onSuccess: (data: UpdateArticleRes) => {
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

  const deleteArticleMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_ARTICLE, { id }),
    {
      onSuccess: (_: DeleteArticleRes, variables) => {
        const previousArticles = queryClient.getQueryData<Article[]>(QUERY_KEY.ARTICLES)
        if (!previousArticles) return

        queryClient.setQueryData(
          QUERY_KEY.ARTICLES,
          previousArticles.filter((article) => article.id !== variables)
        )
      },
    }
  )

  return {
    createArticleMutation,
    updateArticleMutation,
    deleteArticleMutation,
  }
}
