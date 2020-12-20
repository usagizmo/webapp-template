// In order to use `h-screen-fixed', `min-h-screen-fixed', and `max-h-screen-fixed',
// you need to update `--vh` with `useHScreenFixed`.

module.exports = {
  theme: {
    extend: {
      height: {
        'screen-fixed': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'screen-fixed': 'calc(var(--vh, 1vh) * 100)',
      },
      maxHeight: {
        'screen-fixed': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
}
