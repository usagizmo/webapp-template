import { useEffect } from 'react'
import { useRouter } from 'next/router'

type OnRouteChangeComplete = (path: string) => void

export const useRouteChangeComplete = (
  onRouteChangeComplete: OnRouteChangeComplete
) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [onRouteChangeComplete, router.events])
}
