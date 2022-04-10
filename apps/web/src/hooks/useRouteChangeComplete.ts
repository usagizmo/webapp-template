import { useEffect } from 'react'
import { useRouter } from 'next/router'

type OnRouteChangeComplete = (path: string) => void

export const useRouteChangeComplete = (
  onRouteChangeComplete: OnRouteChangeComplete,
  callOnMount?: boolean
) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [onRouteChangeComplete, router.events])

  useEffect(() => {
    if (!callOnMount) return
    onRouteChangeComplete(router.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
