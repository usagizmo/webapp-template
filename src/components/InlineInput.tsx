import { VFC } from 'react'

interface Props {
  value: string
}

const InlineInput: VFC<Props> = ({ value, ...bindings }) => {
  return (
    <label className="relative overflow-hidden inline-flex">
      <div className="min-h-[1em] min-w-[1em] overflow-hidden invisible whitespace-pre">
        {value}
      </div>
      <textarea
        className="absolute top-0 left-0 w-full h-full resize-none block overflow-hidden outline-none bg-transparent"
        style={{ font: 'inherit' }}
        value={value}
        {...bindings}
      />
    </label>
  )
}

export default InlineInput
