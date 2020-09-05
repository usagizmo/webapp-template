module.exports = () => ({ addComponents }) => {
  const components = {
    '.p-link-text--underline75': {
      textDecoration: 'underline',
      '&:hover': {
        opacity: 0.75,
      },
    },
    '.p-link-text--stroke-underline': {
      display: 'inline-flex',
      overflow: 'hidden',
      position: 'relative',
      '&::after': {
        position: 'absolute',
        left: '0',
        bottom: '0',
        right: '0',
        height: '1.1px', // It may not be displayed when you rotate it.
        backgroundColor: 'currentColor',
        content: '""',
        transition: 'transform 0.28s',
        transform: 'translateX(-100%)',
      },
      '&:hover::after': {
        transform: 'translateX(0%)',
      },
    },
  }

  addComponents(components)
}
