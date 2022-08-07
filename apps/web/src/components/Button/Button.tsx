import type { MouseEventHandler, FC, ReactNode } from 'react'
import { useMemo } from 'react'
import clsx from 'clsx'
import { match } from 'ts-pattern'
import type { XOR } from 'ts-xor'

type PrimaryProps = {
  primary?: boolean
}

type DangerProps = {
  danger?: boolean
}

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type SpanProps = {
  as: 'span'
}

type Props = {
  disabled?: boolean
  children: ReactNode
} & XOR<PrimaryProps, DangerProps> &
  XOR<ButtonProps, SpanProps>

export const Button: FC<Props> = ({
  type = 'button',
  primary,
  danger,
  disabled,
  onClick,
  as,
  children,
}) => {
  const appendStyles = match({ primary, danger })
    .with(
      { primary: true },
      () =>
        'border-[#18181b] bg-[#18181b] text-slate-50 hover:bg-slate-50 hover:text-[#18181b]'
    )
    .with(
      { danger: true },
      () => 'border-[#d4d4d8] bg-slate-50 text-[#dc2626] hover:border-[#dc2626]'
    )
    .otherwise(
      () => 'border-[#d4d4d8] bg-slate-50 text-[#18181b] hover:border-[#18181b]'
    )

  const buttonStyle = useMemo(
    () =>
      clsx(
        'inline-flex h-9 items-center justify-center rounded-md border px-5 duration-150 text-sm',
        appendStyles,
        disabled &&
          'pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
      ),
    [appendStyles, disabled]
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
