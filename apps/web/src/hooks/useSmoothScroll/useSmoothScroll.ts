import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { scrollByHash } from './scrollUtils'

const extractHash = (url: string): string => {
  const name = url.split('#')[1] ?? ''
  return name ? `#${name}` : ''
}

export const useSmoothScroll = () => {
  const router = useRouter()
  const hash = extractHash(router.asPath)

  useEffect(() => {
    if (!hash || !document.querySelector(hash)) return
    scrollByHash(hash)
  }, [hash])
}
