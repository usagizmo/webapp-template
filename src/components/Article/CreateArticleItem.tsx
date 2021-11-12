import React, { ChangeEventHandler, useCallback, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { FileArrowUp } from 'phosphor-react'
import ERROR from '../../constants/error'
import { useCreateArticleMutation } from '../../hooks/queries/articles/useCreateArticleMutation'
import useQueryHandle from '../../hooks/useQueryHandle'
import Button from '../Button'
import Input from '../Input'
import { getArticlesStorageRef } from '../../utils/storageUtils'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import { ArticleImageFIle } from '../../types/dataTypes'
import ArticleImage from './ArticleImage'

interface Inputs {
  title: string
  content: string
  imageFile: ArticleImageFIle | null
}

interface Props {}

const CreateArticleItem: VFC<Props> = () => {
  const createArticleMutation = useCreateArticleMutation()
  const queryHandle = useQueryHandle(createArticleMutation)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<Inputs>()

  const watchImageFile = watch('imageFile', null)

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

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      const el = event.target
      if (!el) return
      const file = el.files?.[0]
      if (!file) return

      // const fileReader = new FileReader()
      // fileReader.addEventListener(
      //   'load',
      //   () => {
      //     const fileDataURL = fileReader.result as string
      //     //
      //   },
      //   false
      // )
      // fileReader.readAsDataURL(file)

      try {
        const articleFileRef = getArticlesStorageRef()
        await uploadBytes(articleFileRef, file, { contentType: file.type })
        const imageFileURL = await getDownloadURL(articleFileRef)
        setValue('imageFile', { name: file.name, url: imageFileURL })
      } catch (error) {
        console.error(error)
      }
    },
    [setValue]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[16px]">
      <div className="flex flex-col">
        <Input
          registerReturn={register('title', {
            required: ERROR.REQUIRED('Title'),
          })}
          fieldError={errors.title}
          type="text"
          placeholder="Title"
        />
      </div>
      <div>
        <Input
          registerReturn={register('content', {
            required: ERROR.REQUIRED('Content'),
          })}
          fieldError={errors.content}
          type="text"
          placeholder="Content"
        />
      </div>
      <div>
        {watchImageFile && (
          <div className="mb-[8px]">
            <ArticleImage imageFile={watchImageFile} />
          </div>
        )}
        <label className="inline-flex justify-center items-center py-[9px] px-[20px] border border-transparent shadow-sm rounded-[20px] text-sm leading-[22px] font-medium disabled:opacity-50 disabled:pointer-events-none focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 bg-gray-100 hover:bg-gray-200 focus-within:ring-gray-300 cursor-pointer">
          <FileArrowUp size={20} className="mr-[6px]" />
          <span className="font-medium">Select a file</span>
          <input type="file" className="u-sr-only" onChange={onChangeFile} />
        </label>
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
