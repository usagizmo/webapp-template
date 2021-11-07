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
  imageUrl: string | null // Firebase storage URL
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

export const returnArticleProps = `
  id
  title
  content
  imageUrl
  created_at
  updated_at
`

//

export type CreateArticleProps = Pick<Article, 'title' | 'content' | 'imageUrl'>
export type UpdateArticleProps = Pick<Article, 'id' | 'title' | 'content' | 'imageUrl'>
