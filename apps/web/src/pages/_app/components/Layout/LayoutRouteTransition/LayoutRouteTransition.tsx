import { FC, useRef } from 'react'
import { useRouter } from 'next/router'
import { SwitchTransition, Transition } from 'react-transition-group'
import { classNames } from 'utils'
import { usePrefetchImages } from '@/hooks/usePrefetchImages'
import { useRouteChangeComplete } from '@/hooks/useRouteChangeComplete'
import { usePageTransition } from './usePageTransition/usePageTransition'

type Props = {}

const useRouteTransition = () => {
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

export const LayoutRouteTransition: FC<Props> = ({ children }) => {
  const { router, ref, addEndListener } = useRouteTransition()

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
            className={classNames('c-route-transition bg-white', `is-${state}`)}
          >
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  )
}
