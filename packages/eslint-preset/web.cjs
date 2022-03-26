const base = require('./node.cjs')

module.exports = {
  ...base,
  env: {
    es2015: true,
    browser: true,
  },
  globals: {
    gsap: true,
    ScrollTrigger: true,
    ScrollToPlugin: true,
  },
}
