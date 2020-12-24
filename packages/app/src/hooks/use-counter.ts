import { useState, useCallback } from 'react'

function useCounter(): { count: number, increment: () => void } {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => setCount((x) => x + 1), [])

  return { count, increment }
}

export default useCounter
