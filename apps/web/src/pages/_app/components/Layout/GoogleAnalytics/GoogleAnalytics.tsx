import Script from 'next/script'
import { usePageView } from '@/pages/_app/components/Layout/GoogleAnalytics/usePageView'
import { GA_ID } from './googleAnalyticsUtils'

export const GoogleAnalytics = () => {
  usePageView()

  if (!GA_ID) return null

  return (
    <>
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" defer strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
          `}
      </Script>
    </>
  )
}
