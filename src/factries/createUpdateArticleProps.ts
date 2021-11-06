import { UpdateArticleProps } from '../types/dataTypes'

const createUpdateArticleProps = (props: UpdateArticleProps): UpdateArticleProps => ({
  id: props.id,
  title: props.title,
  content: props.content,
})

export default createUpdateArticleProps
