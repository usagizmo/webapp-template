import { fixPage, releasePage } from '../utils'

export const setSpMenu = function () {
  const body = document.body
  const openClassName = 'is-sp-menu-open'

  const isOpen = function () {
    return body.classList.contains(openClassName)
  }

  const isPC = function () {
    return window.innerWidth >= 768
  }

  const open = function () {
    if (isOpen()) return

    fixPage()
    body.classList.add(openClassName)

    gsap
      .timeline()
      .to('.js-sp-menu', {
        opacity: 1,
        duration: 0.16,
        pointerEvents: 'auto',
      })
      .fromTo(
        '.js-sp-menu_item',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          ease: 'power4.out',
          duration: 0.6,
        },
        0.24
      )
  }

  const close = function () {
    if (!isOpen()) return

    releasePage()
    body.classList.remove(openClassName)

    gsap
      .timeline()
      .to('.js-sp-menu_item', {
        y: -20,
        opacity: 0,
        duration: 0.4,
      })
      .to(
        '.js-sp-menu',
        {
          opacity: 0,
          duration: 0.16,
          pointerEvents: 'none',
        },
        0
      )
  }

  const toggle = function () {
    isOpen() ? close() : open()
  }

  const hamburger = document.querySelector('.js-hamburger')
  hamburger.addEventListener('click', function (e) {
    e.preventDefault()
    toggle()
  })

  gsap.utils.toArray('.js-sp-menu a').forEach(function (el) {
    el.addEventListener('click', function () {
      close()
    })
  })

  const onResize = function () {
    if (isOpen() && isPC()) {
      close()
    }
  }

  window.addEventListener('resize', onResize)
}
