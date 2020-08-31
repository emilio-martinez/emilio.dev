import { resolve } from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';

export default () => {
  return [
    {
      input: resolve(__dirname, './src/admin.js'),
      output: {
        dir: resolve(__dirname, './dist/admin/'),
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        format: 'iife',
        compact: true,
      },
      plugins: [
        alias({
          entries: [
            { find: 'react', replacement: 'preact/compat' },
            { find: 'react-dom', replacement: 'preact/compat' },
          ],
        }),
        nodeResolve(),
        commonjs(),
        json(),
        terser(),
      ],
      onwarn(warning, warn) {
        // Omit eval warnings for `netlify-cms-app`
        // The usage seems "okay-ish" and otherwise result in very noisy logs in minified code
        if (warning.code === 'EVAL' && /node_modules\/netlify-cms/.test(warning.id)) {
          return;
        }

        warn(warning);
      },
    },
  ];
};
