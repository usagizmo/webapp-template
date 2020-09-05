module.exports = () => ({ addComponents }) => {
  const components = {
    '.p-list-text': {
      display: 'inline-flex',
      flexWrap: 'wrap',
      // Insert other patterns separated by commas
      '&.is-slash > *': {
        '&:not(:last-of-type)': {
          position: 'relative',
          paddingRight: '1em',
        },
        '&:not(:last-of-type)::before': {
          position: 'absolute',
          top: '0',
          right: '0.25em',
        },
      },
      // Set content
      '&.is-slash > *:not(:last-of-type)::before': {
        content: '"/"',
      },
    },
  }

  addComponents(components)
}
