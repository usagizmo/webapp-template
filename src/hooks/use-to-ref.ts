import { useEffect, useRef } from 'react'

export const useToRef = <T>(value: T) => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
