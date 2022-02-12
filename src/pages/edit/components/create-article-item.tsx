import React, { ChangeEventHandler, useCallback, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { FileArrowUp } from 'phosphor-react'
import { useQueryClient } from 'react-query'
import { ERROR } from '@/constants/error'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { getArticlesStorageRef } from '@/utils/storage-utils'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import { ArticleImageFIle } from '@/types/data-types'
import { ArticleImage } from '@/components/article/article-image'
import {
  ArticlesQuery,
  useArticlesQuery,
  useCreateArticleMutation,
} from '@/generated/graphql'

type Inputs = {
  title: string
  content: string
  imageFile: ArticleImageFIle | null
}

type Props = {}

export const CreateArticleItem: VFC<Props> = () => {
  const queryClient = useQueryClient()
  const createArticleMutation = useCreateArticleMutation({
    onSuccess: (data) => {
      const useArticlesQueryKey = useArticlesQuery.getKey()
      const prev = queryClient.getQueryData<ArticlesQuery>(useArticlesQueryKey)
      if (!prev) return
      queryClient.setQueryData(useArticlesQueryKey, {
        ...prev,
        articles: [data.insert_articles_one, ...prev.articles],
      })
    },
  })
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
        <label className="inline-flex cursor-pointer items-center justify-center rounded-[20px] border border-transparent bg-gray-100 py-[9px] px-[20px] text-sm font-medium leading-[22px] shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50">
          <FileArrowUp size={20} className="mr-[6px]" />
          <span className="font-medium">Select a file</span>
          <input type="file" className="sr-only" onChange={onChangeFile} />
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