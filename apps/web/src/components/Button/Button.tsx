import { MouseEventHandler, FC } from 'react'
import { classNames } from 'utils'

type Props = {
  type?: 'submit' | 'button' | 'reset'
  primary?: boolean
  black?: boolean
  icon?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({
  type = 'button',
  primary,
  black,
  icon,
  disabled,
  onClick,
  children,
}) => {
  const isDefaultColor = !primary && !black

  return (
    <button
      type={type}
      className={classNames(
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        primary
          ? 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300'
          : '',
        black
          ? 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300'
          : '',
        isDefaultColor
          ? 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-300'
          : '',
        icon ? 'h-6 w-6 !p-0' : ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
