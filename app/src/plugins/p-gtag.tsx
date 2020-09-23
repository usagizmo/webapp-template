import React, { FC } from 'react'

interface Props {
  uid: string
}

const PGtag: FC<Props> = ({ uid }) => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${uid}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${uid}');`,
        }}
      />
    </>
  )
}

export default PGtag
