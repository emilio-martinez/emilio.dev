// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        assetFilter: (assetFilename) => !assetFilename.includes(`vendors-netlify`),
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
            // Disable default vendor chunks
            vendors: false,
            defaultVendors: false,
          },
        },
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            parallel: true,
            terserOptions: {
              safari10: true,
              parse: {
                ecma: 2017,
              },
              compress: {
                ecma: 5,
                warnings: false,
                pure_getters: true,
                // PURE comments work best with 3 passes.
                // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
                passes: 3,
                // The following two options are known to break valid JavaScript code
                comparisons: false,
                inline: 2,
              },
              mangle: { safari10: true },
              output: {
                ecma: 5,
                safari10: true,
                comments: false,
                // Fixes usage of Emoji and certain Regex
                ascii_only: true,
              },
            },
          }),
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        mainFields: ['es2015', 'module', 'main'],
      },
    },
  ];
};
