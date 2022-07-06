import {
  nextTick,
  onImagesLoaded,
  fixPage,
  releasePage,
  removeHashFromURL,
} from '../utils'

export const setModal = function () {
  const open = function (sel) {
    const modal = document.querySelector(sel)
    if (!modal) return

    fixPage()
    modal.classList.add('is-open')
  }

  const close = function () {
    const modal = document.querySelector('[data-modal].is-open')
    if (!modal) return

    releasePage()
    modal.classList.remove('is-open')

    const iframe = modal.querySelector('iframe')
    if (!iframe) return
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      '*'
    )

    removeHashFromURL()
  }

  gsap.utils.toArray('[data-modal-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault()

      const hash = el.getAttribute('href') || el.getAttribute('data-modal-open')
      open(hash)

      nextTick(function () {
        window.location.hash = hash
      })
    })
  })

  gsap.utils.toArray('[data-modal-close]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.dataset.modalClose !== 'prevent') {
        e.preventDefault()
      }
      close()
    })
  })

  const hash = window.location.hash
  if (hash) {
    const scrollTarget = document.querySelector(
      '[href="' + hash + '"][data-modal-open]'
    )
    const modal = document.querySelector(hash)
    if (!scrollTarget || !modal) {
      return
    }

    onImagesLoaded('img[src]', function () {
      const adjust = -180
      const scrollTop =
        window.pageYOffset + scrollTarget.getBoundingClientRect().top + adjust
      scrollTo(0, scrollTop)
      open(hash)
    })
  }
}
