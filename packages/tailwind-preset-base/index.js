/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // When not using Web fonts
        // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Yu Gothic", YuGothic, "BIZ UDPGothic", Meiryo, sans-serif',
        // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "BIZ UDPGothic", Meiryo, sans-serif',
        sans: 'Inter, yakuhanjp_Noto, Noto Sans JP, sans-serif',
        mono: 'Source Code Pro, Noto Sans JP, monospace',
        keycode: 'Lucida Grande',
      },
    },
  },
  plugins: [],
};
