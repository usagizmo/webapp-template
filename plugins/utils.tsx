export const isClient = typeof window === 'object'

export const isMobileDevice = isClient
  ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Opera Mini|IEMobile/i.test(
      window.navigator.userAgent
    )
  : null
