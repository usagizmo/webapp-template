import type { MouseEvent } from 'react'
import { gsap } from 'gsap'

const getHash = (url: string) => {
  const name = url.split('#')[1]
  return name ? `#${name}` : ''
}

export const scrollByHash = (hash: string) => {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  const fixedHeader = document.querySelector('#fixed-header')
  const offset = fixedHeader ? fixedHeader.clientHeight : 0
  const scrollTop = target ? target.offsetTop - offset : 0

  gsap.to(window, {
    duration: 0.8,
    scrollTo: scrollTop,
    ease: 'power3.out',
  })
}

export const scrollByHref = (e: MouseEvent) => {
  e.preventDefault()

  const hash = getHash(e.currentTarget.getAttribute('href') || '')

  scrollByHash(hash)
  window.history.pushState(null, '', hash)
}
