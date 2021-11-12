/**
 * Data items that exist in Hasura's DB
 */

export interface User {
  id: string
  email: string
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

export const returnCurrentUserProps = `
  id
  email
`

export interface ArticleImageFIle {
  name: string
  url: string
}

export interface Article {
  id: string
  title: string
  content: string
  userId: string // users.id
  imageFile: ArticleImageFIle | null // Firebase storage URL
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

export const returnArticleProps = `
  id
  title
  content
  imageFile
  created_at
  updated_at
`

//

export type CreateArticleProps = Pick<Article, 'title' | 'content' | 'imageFile'>
export type UpdateArticleProps = Pick<Article, 'id' | 'title' | 'content' | 'imageFile'>
