import { gsap } from 'gsap'

export const getTimelineDefault = (
  prevNode: HTMLElement,
  node: HTMLElement
) => {
  return gsap
    .timeline()
    .to(
      prevNode,
      {
        autoAlpha: 0,
        y: -16,
      },
      0
    )
    .from(
      node,
      {
        autoAlpha: 0,
        y: 16,
      },
      0
    )
}
