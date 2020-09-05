import { useMemo } from 'react'
import { isClient, isMobileDevice } from './utils'

const useIsMobileDevice = (): boolean => {
  return useMemo((): boolean => (isClient ? isMobileDevice : false), [])
}

export default useIsMobileDevice
