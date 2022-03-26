// eslint-disable-next-line
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: './src/script.js',
  output: {
    file: './public/script.js',
    format: 'iife',
    compact: process.env.NODE_ENV === 'production',
  },
  plugins: [nodeResolve()],
}
