import { VFC } from 'react'

interface Props {}

export const PageLoading: VFC<Props> = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 transition">
      Loading...
    </div>
  )
}
