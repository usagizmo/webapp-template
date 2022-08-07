import {
  removeInitialCover,
  setDeep,
  setIn,
  setModal,
  setSmoothScroll,
  removeAnimateTransitionNone,
} from 'script-modules'
import { nextTick } from 'script-modules/src/utils'

// eslint-disable-next-line no-undef
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

setSmoothScroll()
setIn()
setModal()
setDeep()

nextTick(function () {
  removeAnimateTransitionNone()
})

setTimeout(function () {
  removeInitialCover()
}, 100)
