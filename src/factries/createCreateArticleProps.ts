import { CreateArticleProps } from '../types/dataTypes'

const createCreateArticleProps = (props: CreateArticleProps): CreateArticleProps => ({
  title: props.title,
  content: props.content,
  imageUrl: props.imageUrl,
})

export default createCreateArticleProps
