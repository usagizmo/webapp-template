module.exports = (
  { zIndex, backgroundColor, transitionDuration } = {
    zIndex: 50,
    backgroundColor: '#ffffff',
    transitionDuration: '500ms',
  }
) => ({ addComponents }) => {
  const components = {
    '.p-typekit-cover': {
      position: 'fixed',
      zIndex,
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      backgroundColor,
      pointerEvents: 'none',
      '.wf-active &': {
        opacity: '0',
        transitionDuration,
      },
    },
  }

  addComponents(components)
}
