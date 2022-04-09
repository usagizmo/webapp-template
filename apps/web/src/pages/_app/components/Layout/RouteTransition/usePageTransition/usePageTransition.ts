import { useCallback } from 'react'
import { gsap } from 'gsap'
import { useRouter } from 'next/router'
import { getTimelineDefault } from './getTimeline/getTimelineDefault'

export const usePageTransition = () => {
  const router = useRouter()

  const addEndListener = useCallback(
    (done: () => void) => {
      const pathname = window.location.pathname
      const isEnter = pathname === router.pathname

      // Ignore exit transition
      if (!isEnter) {
        done()
        return
      }

      const prevNode = document.querySelector(
        '.c-route-transition:nth-child(1)'
      ) as HTMLElement
      const nextNode = document.querySelector(
        '.c-route-transition:nth-child(2)'
      ) as HTMLElement

      const tl = gsap.timeline({
        onComplete: done,
      })

      switch (pathname) {
        // Branching of various page transitions
        // case pagesPath.$url().pathname:
        //   break
        default:
          tl.add(getTimelineDefault(prevNode, nextNode))
          break
      }
    },
    [router.pathname]
  )

  return {
    addEndListener,
  }
}
