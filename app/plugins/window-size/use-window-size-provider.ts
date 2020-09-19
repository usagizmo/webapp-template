import { useDebounce, useWindowSize } from 'react-use'
import { useSetRecoilState } from 'recoil'
import { windowSizeState } from './window-size-state'

const useWindowSizeProvider = (): void => {
  const setWindowSize = useSetRecoilState(windowSizeState)
  const { width } = useWindowSize()

  useDebounce(
    () => {
      setWindowSize({
        width: window.innerWidth, // document.body.clientWidth
        height: window.innerHeight,
      })
    },
    200,
    [width]
  )
}

export default useWindowSizeProvider
