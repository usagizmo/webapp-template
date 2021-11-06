import { MouseEventHandler, FC } from 'react'
import classnames from 'classnames'

interface Props {
  type?: 'submit' | 'button' | 'reset'
  primary?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const Button: FC<Props> = ({
  type = 'button',
  primary,
  disabled,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      className={classnames(
        className,
        'inline-flex justify-center items-center py-[8px] px-[20px] border border-transparent shadow-sm rounded-[20px] text-sm leading-[22px] font-medium disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': primary,
          'bg-gray-100 hover:bg-gray-200 focus:ring-gray-300': !primary,
        }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
