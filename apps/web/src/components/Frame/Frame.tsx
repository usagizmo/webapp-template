import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Frame: FC<Props> = ({ children }) => {
  return <div className="rounded-lg bg-slate-50">{children}</div>
}
