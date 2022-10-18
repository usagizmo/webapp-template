// To hot reload on each app, update the value in tailwind.config.cjs for each
// app, then update the following values

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [], // Override in each package
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        // When not using Web fonts
        // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Yu Gothic", YuGothic, "BIZ UDPGothic", Meiryo, sans-serif',
        // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "BIZ UDPGothic", Meiryo, sans-serif',
        sans: 'Inter, yakuhanjp_Noto, Noto Sans CJK JP, Noto Sans JP, sans-serif',
        mono: 'Source Code Pro, Noto Sans CJK JP, Noto Sans JP, monospace',
        keycode: 'Lucida Grande',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.gray[700]'),
            a: {
              color: colors.gray['600'],
              '&:hover': {
                color: colors.black,
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
