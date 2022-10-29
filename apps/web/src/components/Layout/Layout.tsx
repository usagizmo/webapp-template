import type { FC, ReactNode } from 'react'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useAtom } from 'jotai'
import { useSmoothScroll } from '@/hooks/useSmoothScroll/useSmoothScroll'
import { isPageLoadingAtom } from '@/store'
import { LayoutFooter } from './LayoutFooter'
import { LayoutHeader } from './LayoutHeader'
import { PageLoading } from './PageLoading/PageLoading'
import { RouteTransition } from './RouteTransition/RouteTransition'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

type Props = {
  children: ReactNode
}

const useHook = () => {
  useSmoothScroll()
  const [isPageLoading] = useAtom(isPageLoadingAtom)

  return { isPageLoading }
}

export const Layout: FC<Props> = ({ children }) => {
  const { isPageLoading } = useHook()

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
