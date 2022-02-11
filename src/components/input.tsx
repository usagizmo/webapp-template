import { VFC } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  registerReturn: UseFormRegisterReturn
  fieldError: FieldError | undefined
  type: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

export const Input: VFC<Props> = ({
  registerReturn,
  fieldError,
  type,
  label,
  placeholder,
  disabled,
}) => {
  return (
    <div>
      <label>
        {label && (
          <span className="mb-[4px] block text-sm font-medium text-gray-700">
            {label}
          </span>
        )}
        <input
          type={type}
          className="block w-full rounded-md border border-gray-300 py-[8px] px-[12px] shadow-sm hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
          placeholder={placeholder}
          disabled={disabled}
          {...registerReturn}
        />
      </label>
      {fieldError && (
        <p className="mt-[4px] text-[12px] leading-[16px] text-red-500">
          {fieldError.message}
        </p>
      )}
    </div>
  )
}
