import { useRouter } from 'next/router'
import { useStore } from '../../store/use-store'

const usePage = (): { page: number; postsPerPage: number; offset: number } => {
  const router = useRouter()
  const { page: _page } = router.query
  const postsPerPage = useStore((state) => state.wpData.postsPerPage)
  const page = _page ? +_page : 1
  return {
    page,
    postsPerPage,
    offset: (page - 1) * postsPerPage,
  }
}

export default usePage
