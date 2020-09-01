import { resolve } from 'path';
import visualizer from 'rollup-plugin-visualizer';
import alias from '@rollup/plugin-alias';
import styles from 'rollup-plugin-styles';
import builtins from '@erquhart/rollup-plugin-node-builtins';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
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
        assetFileNames: '[name].[hash][extname]',
        format: 'iife',
      },
      plugins: [
        visualizer({
          filename: './dist/_stats/index.html',
        }),
        alias({
          entries: [],
        }),
        styles(),
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
        if (warning.code === 'EVAL' && /node_modules\/netlify-cms/.test(warning.id)) {
          return;
        }

        if (warning.code === 'UNRESOLVED_IMPORT') {
          throw new Error(warning);
        }

        warn(warning);
      },
    },
  ];
};
