import { gql } from 'graphql-request'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($id: String!) {
    users_by_pk(id: $id) {
      id
      email
    }
  }
`

export const GET_ARTICLES = gql`
  query GetArticles {
    articles(order_by: { updated_at: desc }) {
      id
      created_at
      updated_at
      title
      content
    }
  }
`

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    insert_articles_one(object: { title: $title, content: $content }) {
      id
      updated_at
      created_at
      title
      content
    }
  }
`

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: String!, $title: String!, $content: String!) {
    update_articles_by_pk(pk_columns: { id: $id }, _set: { title: $title, content: $content }) {
      id
      updated_at
      created_at
      title
      content
    }
  }
`

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    delete_articles_by_pk(id: $id) {
      id
      title
    }
  }
`
