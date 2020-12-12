import { useEffect } from 'react'
import { useWindowSize } from 'react-use'

const useHScreenFixed = (): void => {
  const { width, height } = useWindowSize()
  useEffect(() => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }, [width, height])
}

export default useHScreenFixed
