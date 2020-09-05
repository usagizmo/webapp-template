const purgeList =
  process.env.BUILD_TYPE === 'tailwind' ? ['./mock/**/*.html'] : ['./src/components/**/*.tsx']

module.exports = {
  purge: process.env.NODE_ENV === 'production' ? purgeList : false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: '#a0aec0', // If you don't write it, it won't load on pinegrow for some reason.
      black2: '#222222',
      crimson: '#dc143c',
    },
    screens: {
      //   'sm': '640px',
      md: '768px',
      lg: '1024px',
      //   'xl': '1280px',
    },
    extend: {
      fontFamily: {
        base:
          'nimbus-sans, -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Helvetica Neue", HelveticaNeue, YuGothic, "Yu Gothic Medium", "Yu Gothic", Verdana, Meiryo, sans-serif',
      },
      fontSize: {
        // '10px': '0.625rem',
        // '11px': '0.6875rem',
        // '12px': '0.75rem',
        // '13px': '0.8125rem',
        // '14px': '0.875rem',
        // '16px': '1rem',
        // '18px': '1.125rem',
        // '20px': '1.25rem',
        // '24px': '1.5rem',
        // '26px': '1.625rem',
        // '30px': '1.875rem',
        // '36px': '2.25rem',
        // '48px': '3rem',
        // '64px': '4rem',
      },
      spacing: {
        '6px': '0.375rem',
      },
      inset: {
        '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [
    require('./plugins/p-cap-item')(),
    require('./plugins/p-link-text')(),
    require('./plugins/p-list-text')(),
    require('./plugins/typekit/p-typekit-cover')(),
  ],
  corePlugins: {},
}
