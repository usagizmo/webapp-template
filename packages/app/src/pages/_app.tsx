import React from 'react'
import { AppProps } from 'next/app'
import { css, Global } from '@emotion/react'

import FLayout from '../foundations/f-layout'
import FProviders from '../foundations/f-providers'

import 'destyle.css'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #__next {
            height: 100%;
          }
          body {
            font-family: 'Inter', -apple-system, blinkMacSystemFont, 'Helvetica Neue', 'Yu Gothic',
              YuGothic, 'BIZ UDPGothic', Meiryo, sans-serif;
          }
        `}
      />
      <FProviders pageProps={pageProps}>
        <FLayout router={router}>
          <Component {...pageProps} />
        </FLayout>
      </FProviders>
    </>
  )
}

export default MyApp
