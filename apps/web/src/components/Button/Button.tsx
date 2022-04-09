import { MouseEventHandler, FC, useMemo } from 'react'
import { XOR } from 'ts-xor'
import { classNames } from 'utils'

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type SpanProps = {
  as: 'span'
}

type Props = {
  primary?: boolean
  black?: boolean
  icon?: boolean
  disabled?: boolean
} & XOR<ButtonProps, SpanProps>

export const Button: FC<Props> = ({
  type = 'button',
  primary,
  black,
  icon,
  disabled,
  onClick,
  as,
  children,
}) => {
  const isDefaultColor = !primary && !black
  const buttonStyle = useMemo(
    () =>
      classNames(
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4',
        primary
          ? 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300'
          : '',
        black
          ? 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300'
          : '',
        isDefaultColor
          ? 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-300'
          : '',
        disabled
          ? 'pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          : '',
        icon ? 'h-6 w-6 !p-0' : ''
      ),
    [primary, black, isDefaultColor, disabled, icon]
  )

  return as === 'span' ? (
    <span className={buttonStyle}>{children}</span>
  ) : (
    <button
      type={type}
      className={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
