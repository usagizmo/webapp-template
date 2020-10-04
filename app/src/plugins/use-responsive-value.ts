import { useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-use'

const useResponsiveValue = <T>(defaultValue: T, props: { [width: number]: T }): T => {
  const { width } = useWindowSize()

  const [value, setValue] = useState(defaultValue)
  const valueList = useMemo(() => {
    const valueList = Object.entries(props).map<[number, T]>((v) => [+v[0], v[1]])
    valueList.sort((a, b) => a[0] - b[0])
    return valueList
  }, [props])

  useEffect(() => {
    let newValue = defaultValue

    for (const [w, v] of valueList) {
      if (w > width) {
        break
      }
      newValue = v
    }

    setValue(newValue)
  }, [defaultValue, valueList, width])

  return value
}

export default useResponsiveValue
