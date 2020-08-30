const purgeList =
  process.env.BUILD_TYPE === 'tailwind'
    ? ['./tailwind/pages/**/*.html']
    : ['./src/components/**/*.tsx', './src/pages/**/*.tsx']

module.exports = {
  purge: process.env.NODE_ENV === 'production' ? purgeList : false,
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   white: '#ffffff',
    //   black: '#000000',
    //   gray: '#a0aec0',
    //   black2: '#222222',
    //   crimson: '#dc143c'
    // },
    // screens: {
    //   'sm': '640px',
    //   'md': '768px',
    //   'lg': '1024px',
    //   'xl': '1280px',
    //   'tablet': '640px',
    //   'laptop': '1024px',
    //   'desktop': '1280px',
    //   'md': {'max': '767px'},
    // },
    // fontSize: {
    //   '10px': '0.625rem',
    //   '11px': '0.6875rem',
    //   '12px': '0.75rem',
    //   '13px': '0.8125rem',
    //   '14px': '0.875rem',
    //   '16px': '1rem',
    //   '18px': '1.125rem',
    //   '20px': '1.25rem',
    //   '24px': '1.5rem',
    //   '30px': '1.875rem',
    //   '36px': '2.25rem',
    //   '48px': '3rem',
    //   '64px': '4rem',
    // },
    extend: {
      // fontFamily: {
      //   'yu-gothic': '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Helvetica Neue", HelveticaNeue, YuGothic, "Yu Gothic Medium", "Yu Gothic", Verdana, Meiryo, sans-serif',
      // },
      // spacing: {
      //   '6px': '0.375rem',
      // },
      inset: {
        '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {},
}
