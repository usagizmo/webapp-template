import type { FC, ReactNode } from 'react'
import { useRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { SwitchTransition, Transition } from 'react-transition-group'
import { usePrefetchImages } from '@/hooks/usePrefetchImages'
import { useRouteChangeComplete } from '@/hooks/useRouteChangeComplete'
import { usePageTransition } from './usePageTransition/usePageTransition'

type Props = {
  children: ReactNode
}

const useHook = () => {
  const router = useRouter()
  const ref = useRef(null)
  const { addEndListener } = usePageTransition()

  useRouteChangeComplete(() => {
    // To fix GSAP ScrollTrigger not working after transition
    window.dispatchEvent(new Event('resize'))
  })

  // Prefetch transition images
  usePrefetchImages([])

  return {
    router,
    ref,
    addEndListener,
  }
}

export const RouteTransition: FC<Props> = ({ children }) => {
  const { router, ref, addEndListener } = useHook()

  return (
    <SwitchTransition mode="in-out">
      <Transition
        key={router.pathname}
        addEndListener={addEndListener}
        nodeRef={ref}
      >
        {(state) => (
          <div
            ref={ref}
            className={clsx('c-route-transition bg-white', `is-${state}`)}
          >
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  )
}
