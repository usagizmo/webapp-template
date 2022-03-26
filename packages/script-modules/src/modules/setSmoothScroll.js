import { nextTick, onImagesLoaded } from '../utils'

export const setSmoothScroll = function () {
  const offset = 48
  const headerSelector = '#header'

  const getScrollTop = function (hash) {
    if (!hash) return 0
    const target = document.querySelector(hash)
    if (!target) return 0
    const targetYOffset =
      target.getBoundingClientRect().top + window.pageYOffset
    const navOffset =
      document.querySelector(headerSelector).clientHeight + offset
    return targetYOffset - navOffset
  }

  gsap.utils
    .toArray('a[href^="#"]:not([data-modal-open])')
    .forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault()

        const hash = el.getAttribute('href')
        if (!hash) return
        const target = document.querySelector(hash)
        if (!target) return

        const offsetY = getScrollTop(hash)
        gsap.to(window, {
          scrollTo: offsetY,
          ease: 'power3.out',
          duration: 0.8,
        })

        nextTick(function () {
          window.location.hash = hash
        })
      })
    })

  const hash = window.location.hash
  if (!hash) return
  const target = document.querySelector(hash)
  if (target) {
    onImagesLoaded('img[src]', function () {
      window.scrollTo(0, getScrollTop(hash))
    })
  }
}
