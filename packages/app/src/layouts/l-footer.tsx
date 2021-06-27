import React, { FC } from 'react'
import { TWITTER_NAME } from '../constants/constants'

interface Props {}

const LFooter: FC<Props> = () => {
  return (
    <p css={{ padding: '8px 16px', fontSize: 12, textAlign: 'center' }}>
      <a href={`https://twitter.com/${TWITTER_NAME}`} target="_blank" rel="noreferrer noopener">
        @{TWITTER_NAME}
      </a>
    </p>
  )
}

export default LFooter
