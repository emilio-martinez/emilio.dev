// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
        path: resolve(__dirname, './src/site/assets/build/admin/'),
        publicPath: '/assets/build/admin/',
        filename: '[name].[hash:20].js',
        chunkFilename: '[name].[chunkhash:20].js',
      },
      plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new ManifestPlugin(),
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
