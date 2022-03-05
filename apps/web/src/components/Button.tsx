import { MouseEventHandler, FC } from 'react'
import { classNames } from '@/utils/utils'

type Props = {
  type?: 'submit' | 'button' | 'reset'
  primary?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export const Button: FC<Props> = ({
  type = 'button',
  primary,
  disabled,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'inline-flex items-center justify-center rounded-[20px] border border-transparent py-2 px-5 text-sm font-medium leading-[22px] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        primary
          ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
          : 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-300'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
