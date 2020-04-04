const path = require("path");

const webpack = require("webpack");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
  target: "web",

  entry: {
    app: path.join(rootPath, "src/index.tsx"),
  },

  output: {
    filename: "[name].[hash:8].js",
    path: path.join(rootPath, "build"),
    publicPath: "",
  },

  resolve: {
    plugins: [PnpWebpackPlugin],
  },

  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },

  devtool: "inline-source-map",

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "React 2048",
      template: path.join(rootPath, "assets/index.hbs"),
      // TODO: make .gz work!
      // jsExtension: ".gz",
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
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, "css-loader", "sass-loader", "postcss-loader"],
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
