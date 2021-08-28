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
