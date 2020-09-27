const purgeList =
  process.env.BUILD_TYPE === 'mock' ? ['./mock/pages/**/*.html'] : ['./src/**/*.tsx']

module.exports = {
  purge: process.env.NODE_ENV === 'production' ? purgeList : false,
  feature: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   white: '#ffffff',
    //   black: '#000000',
    //   gray: '#a0aec0', // If you don't write it, it won't load on pinegrow for some reason.
    //   'black-22': '#222222',
    //   'crimson-dc': '#dc143c',
    // },
    // screens: {
    //   sm: '640px', // tablet
    //   md: '768px',
    //   lg: '1024px', // laptop
    //   xl: '1280px', // desktop
    // },
    container: {
      center: true,
      // padding: {
      //   default: '1rem',
      //   sm: '2rem',
      //   lg: '4rem',
      //   xl: '5rem',
      // },
    },
    extend: {
      fontFamily: {
        sans:
          'Inter var, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, YuGothic, "Yu Gothic Medium", "Yu Gothic", Meiryo, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        // sans: 'Inter var, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      fontSize: {
        // xs3: '0.625rem', // 10px: added
        // xs2: '0.6875rem', // 11px: added
        // xs: '0.75rem', // 12px
        // sm2: '0.8125rem', // 13px: added
        // sm: '0.875rem', // 14px
        // base2: '0.9375rem', // 15px: added
        // base: '1rem', // 16px
        // lg: '1.125rem', // 18px
        // xl: '1.25rem', // 20px
        // xl2: '1.375rem', // 22px: added
        // '2xl': '1.5rem', // 24px
        // '2xl2': '1.625rem', // 26px: added
        // '2xl3': '1.75rem', // 28px: added
        // '3xl': '1.875rem', // 30px
        // '3xl2': '2rem', // 32px: added
        // '3xl3': '2.125rem', // 34px: added
        // '4xl': '2.25rem', // 36px
        // '5xl': '3rem', // 48px
        // '6xl': '4rem', // 64px
      },
      spacing: {
        em: '1em',
        // '1-5': '0.375rem',
        // '100': '25rem',
      },
      inset: {
        // '1/2': '50%',
        // full: '100%',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {},
}
