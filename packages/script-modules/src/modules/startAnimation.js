import { nextTick } from '../utils'

export const startAnimation = function () {
  nextTick(function () {
    document.body.classList.remove('u-prevent-animation')
  })
}
