import type { ChangeEventHandler, FC } from 'react'
import { useCallback } from 'react'
import { ERROR } from 'constants/error'
import { getDownloadURL, uploadBytes } from 'firebase/storage'
import type { ArticlesQuery } from 'generated/dist/graphql'
import {
  useArticlesQuery,
  useCreateArticleMutation,
} from 'generated/dist/graphql'
import { FileArrowUp } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import type { ArticleImageFIle } from 'types/data-types'
import { ArticleImage } from '@/components/Article/ArticleImage'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import { getArticlesStorageRef } from '@/lib/storageRefs'

type Inputs = {
  title: string
  content: string
  imageFile: ArticleImageFIle | null
}

type Props = {}

const useCreateArticleItem = () => {
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

  return {
    queryHandle,
    register,
    errors,
    handleSubmit,
    watchImageFile,
    onSubmit,
    onChangeFile,
  }
}

export const CreateArticleItem: FC<Props> = () => {
  const {
    queryHandle,
    register,
    errors,
    handleSubmit,
    watchImageFile,
    onSubmit,
    onChangeFile,
  } = useCreateArticleItem()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="mb-2">
            <ArticleImage imageFile={watchImageFile} />
          </div>
        )}
        <label className="inline-flex cursor-pointer items-center justify-center rounded-[20px] border border-transparent bg-gray-100 py-[9px] px-5 text-sm font-medium leading-[22px] shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50">
          <FileArrowUp size={20} className="mr-1.5" />
          <span className="font-medium">Select a file</span>
          <input type="file" className="sr-only" onChange={onChangeFile} />
        </label>
      </div>
      <div className="flex space-x-4">
        <Button type="submit" primary disabled={!!queryHandle}>
          Create
        </Button>
      </div>
    </form>
  )
}
