module.exports = () => ({ addComponents }) => {
  const components = {
    '.p-cap-item': {
      position: 'relative',
      paddingLeft: '1em',
      '&::before': {
        position: 'absolute',
        top: '0',
        left: '0',
        content: '"・"',
      },
      '&.is-ast::before': {
        content: '"※"',
      },
    },
  }

  addComponents(components)
}
