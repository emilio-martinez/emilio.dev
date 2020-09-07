// @ts-check
/* eslint-env node */
/* eslint-env es2015 */

const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

/**
 * @type {import('webpack').MultiConfigurationFactory}
 */
module.exports = () => {
  return [
    {
      name: 'admin',
      mode: 'production',
      entry: {
        admin: resolve(__dirname, './src/admin.js'),
      },
      output: {
        path: resolve(__dirname, './dist/admin/'),
        publicPath: '/admin/',
        filename: '[name].[hash:20].js',
        chunkFilename: '[name].[chunkhash:20].js',
      },
      plugins: [
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new ManifestPlugin({
          fileName: resolve(__dirname, './src/site/_data/assetManifestAdmin.json'),
        }),
      ],
      optimization: {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
        },
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        mainFields: ['es2015', 'module', 'main'],
      },
    },
  ];
};
