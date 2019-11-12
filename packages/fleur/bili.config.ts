import { Config } from 'bili'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: {
    typescript2: typescript(),
  },
  bundleNodeModules: ['tslib'],
  output: {
    format: ['cjs', 'esm'],
  },
} as Config
