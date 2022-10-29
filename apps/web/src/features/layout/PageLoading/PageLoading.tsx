import type { FC, ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  show?: boolean
  children?: ReactNode
}

export const PageLoading: FC<Props> = ({ show, children }) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white transition-opacity',
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {children ? children : 'Loading...'}
    </div>
  )
}
