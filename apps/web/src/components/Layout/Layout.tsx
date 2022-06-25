import type { FC, ReactNode } from 'react'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useSmoothScroll } from '@/hooks/useSmoothScroll/useSmoothScroll'
import { useStore } from '@/store/useStore'
import { LayoutFooter } from './LayoutFooter'
import { LayoutHeader } from './LayoutHeader'
import { PageLoading } from './PageLoading/PageLoading'
import { RouteTransition } from './RouteTransition/RouteTransition'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

type Props = {
  children: ReactNode
}

const useLayout = () => {
  useSmoothScroll()
  const isPageLoading = useStore((state) => state.isPageLoading)

  return { isPageLoading }
}

export const Layout: FC<Props> = ({ children }) => {
  const { isPageLoading } = useLayout()

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex-1">
          <LayoutHeader />
          <div className="relative">
            <RouteTransition>{children}</RouteTransition>
          </div>
        </div>
        <LayoutFooter />
      </div>
      <PageLoading show={isPageLoading} />
    </>
  )
}
