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

//

export type EditableArticleProps = Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>
