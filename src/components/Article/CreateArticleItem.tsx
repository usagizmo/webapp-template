import React, { useCallback, VFC } from 'react'
import { useForm } from 'react-hook-form'
import ERROR from '../../constants/error'
import { useArticleMutate } from '../../hooks/mutations/useArticleMutate'
import useQueryHandle from '../../hooks/useQueryHandle'
import Button from '../Button'
import Input from '../Input'

type Inputs = {
  title: string
  content: string
}

interface Props {}

const CreateArticleItem: VFC<Props> = () => {
  const { createArticleMutation } = useArticleMutate()
  const queryHandle = useQueryHandle(createArticleMutation)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit = useCallback(
    async (inputs: Inputs) => {
      try {
        await createArticleMutation.mutateAsync(inputs)
      } catch (err: any) {
        alert(err.message)
      }
    },
    [createArticleMutation]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[24px]">
      <div className="flex flex-col">
        <Input
          registerReturn={register('title', {
            required: ERROR.REQUIRED('Title'),
          })}
          fieldError={errors.title}
          type="text"
          label="Title"
        />
      </div>
      <div>
        <Input
          registerReturn={register('content', {
            required: ERROR.REQUIRED('Password'),
          })}
          fieldError={errors.content}
          type="text"
          label="Content"
        />
      </div>
      <div className="flex space-x-[16px]">
        <Button type="submit" primary disabled={!!queryHandle}>
          Create
        </Button>
      </div>
    </form>
  )
}

export default CreateArticleItem
