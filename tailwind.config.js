const purgeList =
  process.env.BUILD_TYPE === 'mock' ? ['./mock/pages/**/*.html'] : ['./src/**/*.tsx']

module.exports = {
  purge: process.env.NODE_ENV === 'production' ? purgeList : false,
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   white: '#ffffff',
    //   black: '#000000',
    //   gray: '#a0aec0', // If you don't write it, it won't load on pinegrow for some reason.
    //   black2: '#222222',
    //   crimson: '#dc143c',
    // },
    // screens: {
    //   sm: '640px', // tablet
    //   md: '768px',
    //   lg: '1024px', // laptop
    //   xl: '1280px', // desktop
    // },
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      fontFamily: {
        // base:
        //   '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Helvetica Neue", HelveticaNeue, YuGothic, "Yu Gothic Medium", "Yu Gothic", Verdana, Meiryo, sans-serif',
        // hiragino:
        //   '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      },
      fontSize: {
        '10px': '0.625rem',
        '11px': '0.6875rem',
        // '12px': '0.75rem', // xs
        '13px': '0.8125rem',
        // '14px': '0.875rem', // sm
        '15px': '0.9375rem',
        // '16px': '1rem', // base
        // '18px': '1.125rem', // lg
        // '20px': '1.25rem', // xl
        '22px': '1.375rem',
        // '24px': '1.5rem', // 2xl
        '26px': '1.625rem',
        '28px': '1.75rem',
        // '30px': '1.875rem', // 3xl
        '32px': '2rem',
        '34px': '2.125rem',
        // '36px': '2.25rem', // 4xl
        // '48px': '3rem', // 5xl
        // '64px': '4rem', // 6xl
      },
      spacing: {
        em: '1em',
        // '6px': '0.375rem',
        // '100': '25rem',
      },
      // inset: {
      //   '1/2': '50%',
      // },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {},
}
