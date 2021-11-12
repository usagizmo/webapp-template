import { CreateArticleProps } from '../types/dataTypes'

const createCreateArticleProps = (props: CreateArticleProps): CreateArticleProps => ({
  title: props.title,
  content: props.content,
  imageURL: props.imageURL,
})

export default createCreateArticleProps
