import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    builtins({
      crypto: true // Snowplow Core uses uuid which needs crypto shim
    }),
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true, // Needed for working crypto shim
      preferBuiltins: false
    }),
    commonjs()
  ]
}
