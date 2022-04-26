import type { FC } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  registerReturn: UseFormRegisterReturn
  fieldError: FieldError | undefined
  type: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

export const Input: FC<Props> = ({
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
          <span className="mb-2 block text-sm font-medium text-gray-900">
            {label}
          </span>
        )}
        <input
          type={type}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
          disabled={disabled}
          {...registerReturn}
        />
      </label>
      {fieldError && (
        <p className="mt-2 text-sm text-red-600">{fieldError.message}</p>
      )}
    </div>
  )
}
