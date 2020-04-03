const path = require('path')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.ts'),
  },

  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../build'),
  },

  resolve: {
    plugins: [
      PnpWebpackPlugin,
    ],
  },

  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        title: 'React 2048',
      }
    ),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ],
      }
    ]
  },

  devtool: 'inline-source-map',

  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }

}