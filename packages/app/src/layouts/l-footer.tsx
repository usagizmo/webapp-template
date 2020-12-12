import React, { FC } from 'react'
import { TWITTER_NAME } from '../constants/constants'

interface Props {}

const LFooter: FC<Props> = () => {
  return (
    <p className="px-4 py-2 text-xs text-center">
      <a href={`https://twitter.com/${TWITTER_NAME}`} target="_blank" rel="noreferrer noopener">
        @{TWITTER_NAME}
      </a>
    </p>
  )
}

export default LFooter
