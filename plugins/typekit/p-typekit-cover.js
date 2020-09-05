module.exports = () => ({ addComponents }) => {
  const components = {
    '.p-typekit-cover': {
      position: 'fixed',
      zIndex: '50',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      backgroundColor: '#ffffff',
      pointerEvents: 'none',
      '.wf-active &': {
        opacity: '0',
        transitionDuration: '500ms',
      },
    },
  }

  addComponents(components)
}
