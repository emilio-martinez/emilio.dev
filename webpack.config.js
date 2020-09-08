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
      performance: {
        // For now, netlify-cms is a fairly large monolith, so temporarily disable size warnings
        assetFilter: (assetFilename) => !assetFilename.includes(`vendors`),
      },
      entry: {
        admin: resolve(__dirname, './src/admin.js'),
      },
      output: {
        path: resolve(__dirname, './src/site/assets/build/admin/'),
        publicPath: '/assets/build/admin/',
        filename: '[name].[hash:20].js',
        chunkFilename: '[name].[chunkhash:20].js',
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx|js|jsx|mjs)$/,
            // TODO: review not excluding some packages via /[\\/]node_modules[\\/](?:(?!package-name).+)[\\/]/
            exclude: /[\\/]node_modules[\\/]/,
            use: {
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
                babelrc: true,
                cacheDirectory: true,
                cacheCompression: false,
                envName: 'modern',
              },
            },
          },
        ],
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
          cacheGroups: {
            'vendors-react': {
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider|react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              // Prevent chunk from being eliminated and/or incorporated into commons chunk
              enforce: true,
            },
            'vendors-netlify': {
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](netlify-.+)[\\/]/,
              priority: 40,
              // Prevent chunk from being eliminated and/or incorporated into commons chunk
              enforce: true,
            },
          },
        },
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        mainFields: ['es2015', 'module', 'main'],
      },
    },
  ];
};
