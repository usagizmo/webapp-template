import type { MouseEventHandler, FC, ReactNode } from 'react'
import { useMemo } from 'react'
import clsx from 'clsx'
import { match } from 'ts-pattern'
import type { XOR } from 'ts-xor'

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
  children: ReactNode
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
      clsx(
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4',
        primary && 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300',
        black && 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300',
        isDefaultColor && 'bg-gray-100 hover:bg-gray-200 focus:ring-gray-300',
        disabled &&
          'pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        icon && 'h-6 w-6 !p-0'
      ),
    [primary, black, isDefaultColor, disabled, icon]
  )

  return match(as)
    .with('span', () => <span className={buttonStyle}>{children}</span>)
    .with(undefined, () => (
      <button
        type={type}
        className={buttonStyle}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    ))
    .exhaustive()
}
