import { VFC } from 'react'
import classnames from 'classnames'

interface Props {
  value: string
  line?: boolean
}

const InlineInput: VFC<Props> = ({ value, line, ...bindings }) => {
  return (
    <label
      className={classnames('relative inline-flex overflow-hidden rounded', {
        'ring-gray-300 focus-within:shadow-sm focus-within:!ring-2 hover:shadow-sm hover:ring-1':
          line,
      })}
    >
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

export default InlineInput
