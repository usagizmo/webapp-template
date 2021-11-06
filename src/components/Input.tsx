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

const Input: VFC<Props> = ({ registerReturn, fieldError, type, label, placeholder, disabled }) => {
  return (
    <div>
      <label>
        {label && <span className="block text-sm font-medium text-gray-700 mb-[4px]">{label}</span>}
        <input
          type={type}
          className="block w-full shadow-sm rounded-md py-[8px] px-[12px] sm:text-sm border border-gray-300 disabled:opacity-50 disabled:pointer-events-none hover:border-gray-400 focus:outline-none focus:ring-1 focus:border-gray-400 focus:ring-gray-400"
          placeholder={placeholder}
          disabled={disabled}
          {...registerReturn}
        />
      </label>
      {fieldError && (
        <p className="mt-[4px] text-[12px] leading-[16px] text-red-500">{fieldError.message}</p>
      )}
    </div>
  )
}

export default Input
