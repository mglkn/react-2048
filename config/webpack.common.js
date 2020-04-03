const path = require("path");

const PnpWebpackPlugin = require("pnp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
  entry: {
    app: path.join(rootPath, "src/index.tsx"),
  },

  output: {
    filename: "[name].[contenthash:8].js",
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

  devtool: "inline-source-map",

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
