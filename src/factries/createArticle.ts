import { ulid } from 'ulid'
import { Article } from '../types/dataTypes'
import { RequiredPartial } from '../types/extendTypes'

type Props = RequiredPartial<Article, 'title' | 'content' | 'userId'>

const createArticle = (props: Props): Article => ({
  id: props.id ?? ulid(),
  title: props.title,
  content: props.content,
  userId: props.userId,
  created_at: props.created_at ?? new Date().toISOString(),
  updated_at: props.updated_at ?? new Date().toISOString(),
})

export default createArticle
