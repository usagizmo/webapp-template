const base = require('./node.js')

module.exports = {
  ...base,
  env: {
    es2015: true,
    browser: true,
  },
}
