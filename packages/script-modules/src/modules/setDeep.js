export const setDeep = function () {
  const addDeep = function (el, deep, trigger, end) {
    end = end || 'bottom top'
    gsap.from(el, {
      scrollTrigger: {
        trigger: trigger,
        start: 'top bottom',
        end: end,
        scrub: 2.4,
      },
      y: 100 * deep + 'vh',
    })
  }

  gsap.utils.toArray('[data-deep]').forEach(function (el) {
    const deep = el.dataset.deep || 0.075 // 0 - 1
    addDeep(el, deep, el)
  })

  gsap.utils.toArray('[data-deep-group]').forEach(function (groupEl) {
    gsap.utils
      .toArray(groupEl.querySelectorAll('[data-deep-group-item]'))
      .forEach(function (el) {
        const deep = el.dataset.deepGroupItem // 0 - 1
        addDeep(el, deep, groupEl, 'center 30%')
      })
  })
}
