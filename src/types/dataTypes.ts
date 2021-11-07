/**
 * Data items that exist in Hasura's DB
 */

export interface User {
  id: string
  email: string
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

export interface Article {
  id: string
  title: string
  content: string
  userId: string // users.id
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

export const returnArticleProps = `
  id
  title
  content
  created_at
  updated_at
`

//

export type CreateArticleProps = Pick<Article, 'title' | 'content'>
export type UpdateArticleProps = Pick<Article, 'id' | 'title' | 'content'>
