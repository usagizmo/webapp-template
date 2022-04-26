import {
  setDeep,
  setIn,
  setModal,
  setSmoothScroll,
  startAnimation,
} from 'script-modules'

// eslint-disable-next-line no-undef
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

startAnimation()
setSmoothScroll()
setIn()
setModal()
setDeep()
