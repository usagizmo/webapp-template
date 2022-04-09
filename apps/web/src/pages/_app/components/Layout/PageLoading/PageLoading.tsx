import { FC } from 'react'
import { classNames } from 'utils'

type Props = {
  show?: boolean
}

export const PageLoading: FC<Props> = ({ show, children }) => {
  return (
    <div
      className={classNames(
        'fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white transition-opacity',
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {children ? children : 'Loading...'}
    </div>
  )
}
