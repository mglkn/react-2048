const path = require("path");

const webpack = require("webpack");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
  target: "web",

  entry: {
    app: path.join(rootPath, "src/index.tsx"),
  },

  output: {
    filename: "[name].[hash:8].js",
    path: path.join(rootPath, "build"),
  },

  resolve: {
    plugins: [PnpWebpackPlugin],
  },

  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "React 2048",
      template: path.join(rootPath, "assets/index.hbs"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },

  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
