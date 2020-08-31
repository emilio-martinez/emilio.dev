import { resolve } from 'path';
import builtins from '@erquhart/rollup-plugin-node-builtins';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default () => {
  return [
    {
      input: resolve(__dirname, './src/admin.js'),
      output: {
        dir: resolve(__dirname, './dist/admin/'),
        // TODO: Add [hash]
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'iife',
      },
      plugins: [
        builtins(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
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
