export const setIn = function () {
  gsap.utils.toArray('[data-in]').forEach(function (el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 100%-=120px',
        toggleClass: 'is-in',
        once: true,
      },
    })
  })
}
