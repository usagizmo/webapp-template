import { VFC } from 'react'
import classnames from 'classnames'

interface Props {
  value: string
  line?: boolean
}

const InlineInput: VFC<Props> = ({ value, line, ...bindings }) => {
  return (
    <label
      className={classnames('relative overflow-hidden inline-flex rounded', {
        'hover:ring-1 hover:shadow-sm focus-within:shadow-sm focus-within:!ring-2 ring-gray-300':
          line,
      })}
    >
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
