import { CreateArticleProps } from '../types/dataTypes'

const createCreateArticleProps = (props: CreateArticleProps): CreateArticleProps => ({
  title: props.title,
  content: props.content,
  imageFile: props.imageFile ?? null,
})

export default createCreateArticleProps
