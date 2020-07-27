import React, { useEffect, useRef } from 'react'

const useToRef = <T>(value: T): React.MutableRefObject<T> => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export default useToRef
