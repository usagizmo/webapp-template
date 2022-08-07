export const removeAnimateTransitionNone = function () {
  document.body.classList.remove(
    '[&_*]:!animate-none',
    '[&_*]:!transition-none'
  )
}
