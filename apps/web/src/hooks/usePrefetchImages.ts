import { useEffect } from 'react'

export const usePrefetchImages = (paths: string[]) => {
  useEffect(() => {
    paths.forEach((path) => {
      const img = new Image()
      img.src = path
    })
  }, [paths])
}
