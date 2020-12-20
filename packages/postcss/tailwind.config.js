// The success of the coding depends on this file
// Run `yarn viewer` to check
// Referrences:
// - https://tailwindcss.com/docs/presets
// - https://unpkg.com/browse/tailwindcss@2.0.2/stubs/defaultConfig.stub.js

module.exports = {
  presets: [require('./plugins/screen-fixed')],
  purge: [], // In each package are specified
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    // screens: {
    //   // https://tailwindcss.com/docs/breakpoints
    //   sm: '640px', // tablet
    //   md: '768px',
    //   lg: '1024px', // laptop
    //   xl: '1280px', // desktop
    //   '2xl': '1536px',
    // },
    // textColor: {
    //   // https://tailwindcss.com/docs/text-color
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   primary: '#3490dc',
    //   secondary: '#ffed4a',
    //   danger: '#e3342f',
    // },
    // borderColor: {
    //   // https://tailwindcss.com/docs/border-color
    //   DEFAULT: '#3490dc',
    //   primary: '#3490dc',
    //   secondary: '#ffed4a',
    //   danger: '#e3342f',
    // },
    // backgroundColor: {
    //   // https://tailwindcss.com/docs/background-color
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   primary: '#3490dc',
    //   secondary: '#ffed4a',
    //   danger: '#e3342f',
    // },
    // backgroundImage: {
    //   // https://tailwindcss.com/docs/background-image
    //   'image-name': "url('/images/image-name.png')",
    // },
    // divideColor: {
    //   // https://tailwindcss.com/docs/divide-color
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   primary: '#3490dc',
    //   secondary: '#ffed4a',
    //   danger: '#e3342f',
    // },
    // colors: {
    //   // https://tailwindcss.com/docs/customizing-colors
    //   // Either give each property a meaningful name or specify a generic color
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   'black-22': '#222222',
    // },
    fontSize: {
      // https://tailwindcss.com/docs/font-size
      // Instead of adding a property, consider whether it can be handled by changing the value
      xs: ['0.75rem', '1rem'], // 12px
      sm: ['0.875rem', '1.25rem'], // 14px
      base: ['1rem', '1.5rem'], // 16px
      lg: ['1.125rem', '1.75rem'], // 18px
      xl: ['1.25rem', '1.75rem'], // 20px
      '2xl': ['1.5rem', '2rem'], // 24px
      '3xl': ['1.875rem', '2.25rem'], // 30px
      '4xl': ['2.25rem', '2.5rem'], // 36px
      '5xl': ['3rem', '1'], // 48px
      '6xl': ['3.75rem', '1'], // 60px
      '7xl': ['4.5rem', '1'], // 72px
      '8xl': ['6rem', '1'], // 96px
      '9xl': ['8rem', '1'], // 128px
      // [Custom]
      // Pixel-based sizes
      // '9px': '0.562rem',
      // '10px': '0.625rem',
      // '11px': '0.6875rem',
      // '13px': '0.8125rem',
      // '15px': '0.9375rem',
    },
    // transitionDuration: {
    //   // https://tailwindcss.com/docs/transition-duration
    //   0: '0ms',
    //   300: '300ms',
    //   400: '400ms',
    // },
    extend: {
      fontFamily: {
        sans:
          'Inter var, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, YuGothic, "Yu Gothic Medium", "Yu Gothic", Meiryo, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        // sans:
        //   'Inter var, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      lineHeight: {
        // https://tailwindcss.com/docs/line-height
      },
      letterSpacing: {
        // https://tailwindcss.com/docs/letter-spacing
      },
      inset: {
        // Do not add more, use margins (or negative margins) instead
        '1/2': '50%',
        full: '100%',
      },
      spacing: {
        // https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
        em: '1em',
        // '1.5em': '1.5em',
        // Spacing should basically be specified with `Default spacing scale`.
        // Or you can specify it as a fraction (percentage).
        // If it is absolutely necessary, use the following specification.
        // Because we have to do more designed coding than designed data.
        // '18': '4.5rem', // 72px
        // '22': '5.5rem', // 88px
        // '26': '6.5rem', // 104px
        // '30': '7.5rem', // 120px
        // '34': '8.5rem', // 136px
        // '38': '9.5rem', // 152px
        // '42': '10.5rem', // 168px
        // '46': '11.5rem', // 184px
        // '50': '12.5rem', // 200px
        // '54': '13.5rem', // 216px
        // '58': '14.5rem', // 232px
        // '62': '15.5rem', // 248px
        // '66': '16.5rem', // 264px
        // '68': '17rem', // 272px
        // '70': '17.5rem', // 280px
        // '74': '18.5rem', // 296px
        // '76': '19rem', // 304px
        // '78': '19.5rem', // 312px
        // '82': '20.5rem', // 328px
        // '84': '21rem', // 336px
        // '86': '21.5rem', // 344px
        // '88': '22rem', // 352px
        // '90': '22.5rem', // 360px
        // '92': '23rem', // 368px
        // '94': '23.5rem', // 376px
        // '98': '24.5rem', // 392px
        // '100': '25rem', // 400px
      },
      width: {
        // https://tailwindcss.com/docs/width
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/9': '11.1111111%',
        '2/9': '22.2222222%',
        '3/9': '33.3333333%',
        '4/9': '44.4444444%',
        '5/9': '55.5555555%',
        '6/9': '66.6666666%',
        '7/9': '77.7777777%',
        '8/9': '88.8888888%',
      },
      minWidth: {
        // https://tailwindcss.com/docs/min-width
      },
      maxWidth: {
        // https://tailwindcss.com/docs/max-width
      },
      animation: {
        // https://tailwindcss.com/docs/animation
      },
      // keyframes: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
