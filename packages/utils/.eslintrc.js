const preset = require('config/eslint-preset')

module.exports = {
  ...preset,
  ignorePatterns: ['**/dist/*.js'],
}
