// eslint-disable-next-line no-undef
const base = require('eslint-preset/web.js')

// eslint-disable-next-line no-undef
module.exports = {
  ...base,
  globals: {
    gsap: true,
  },
}
