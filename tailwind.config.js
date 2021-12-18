module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    fontFamily: {
      // When not using Web fonts
      // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Yu Gothic", YuGothic, "BIZ UDPGothic", Meiryo, sans-serif',
      // sans: '-apple-system, blinkMacSystemFont, Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "BIZ UDPGothic", Meiryo, sans-serif',
      sans: ['Inter', 'yakuhanjp_Noto', 'Noto Sans CJK JP', 'Noto Sans JP', 'sans-serif'],
      mono: ['Source Code Pro', 'Noto Sans CJK JP', 'Noto Sans JP', 'monospace'],
      keycode: ['Lucida Grande'],
    },
  },
  plugins: [],
}
