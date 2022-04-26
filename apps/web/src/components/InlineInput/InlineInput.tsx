import type { FC } from 'react'

type Props = {
  value: string
}

export const InlineInput: FC<Props> = ({ value, ...bindings }) => {
  return (
    <label className="relative inline-flex overflow-hidden rounded ring-gray-300 focus-within:shadow-sm focus-within:!ring-2 hover:shadow-sm hover:ring-1">
      <div className="invisible min-h-[1em] min-w-[1em] overflow-hidden whitespace-pre">
        {value}
      </div>
      <textarea
        className="absolute top-0 left-0 block h-full w-full resize-none overflow-hidden bg-transparent outline-none"
        style={{ font: 'inherit' }}
        value={value}
        {...bindings}
      />
    </label>
  )
}
