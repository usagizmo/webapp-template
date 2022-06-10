import type { FC, ReactNode } from 'react'
import { useState, useEffect } from 'react'

type Props = {
  children?: ReactNode
}

export const NoSSR: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? <div>{children}</div> : null
}
