import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: false,
    },
  ],
  plugins: [
    external(),
    resolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    typescript(),
    terser(),
  ],
};
