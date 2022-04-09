import { useRouteChangeComplete } from '@/hooks/useRouteChangeComplete'
import { GA_ID, pageview } from './googleAnalyticsUtils'

export const usePageView = () => {
  useRouteChangeComplete((path: string) => {
    if (!GA_ID) return
    pageview(path)
  })
}
