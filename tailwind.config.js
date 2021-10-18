const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // When not using Web fonts
      // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Yu Gothic", YuGothic, "BIZ UDPGothic", Meiryo, sans-serif',
      // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "BIZ UDPGothic", Meiryo, sans-serif',
      sans: ['Inter', 'yakuhanjp_Noto', 'Noto Sans CJK JP', 'Noto Sans JP', 'sans-serif'],
      mono: ['Source Code Pro', 'Noto Sans CJK JP', 'Noto Sans JP', 'monospace'],
      keycode: ['Lucida Grande'],
    },
    container: {
      center: true,
      padding: '24px',
    },
    extend: {
      colors: {
        // https://tailwindcss.com/docs/customizing-colors
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
