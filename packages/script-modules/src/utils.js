export const nextTick = function (callback) {
  setTimeout(callback, 20)
}

export const throttle = function (func, interval) {
  var timer = null
  var self = this
  return function () {
    if (timer === null) {
      timer = setTimeout(function () {
        func.apply(self, arguments)
        timer = null
      }, interval)
    }
  }
}

export const onChangeMedia = function (callback) {
  const mediaQuery = window.matchMedia('(min-width: 768px)')

  function onChange(e) {
    callback(e.matches) // isPC
  }

  mediaQuery.addListener(onChange)
  onChange(mediaQuery)
}

export const onImagesLoaded = function (selector, callback) {
  const imgs = gsap.utils.toArray(selector)
  let count = imgs.length

  if (count === 0) {
    callback()
    return
  }

  gsap.utils.toArray(selector).forEach(function (el) {
    const src = el.getAttribute('src')
    const img = new Image()
    img.onload = function () {
      count -= 1
      if (count === 0) {
        nextTick(callback)
      }
    }
    img.src = src
  })
}

export const fixPage = function () {
  const body = document.body

  if (body.classList.contains('is-fixed')) {
    return
  }

  const scrollTop = window.pageYOffset
  body.dataset.scrollTop = scrollTop
  body.classList.add('is-fixed')
  body.style.position = 'fixed'
  body.style.left = '0'
  body.style.top = -scrollTop + 'px'
  body.style.width = '100%'
}

export const releasePage = function () {
  const body = document.body

  if (!body.classList.contains('is-fixed')) {
    return
  }

  const scrollTop = body.dataset.scrollTop || '0'
  body.classList.remove('is-fixed')
  body.removeAttribute('style')
  window.scrollTo(0, scrollTop)
}

export const removeHashFromURL = function () {
  history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  )
}
