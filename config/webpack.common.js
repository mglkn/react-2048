const path = require("path");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
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
    new CopyWebpackPlugin([
      {
        from: path.resolve(rootPath, "assets/favicon.ico"),
        to: path.resolve(rootPath, "build"),
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/\.test.tsx?$/, /node_modules/],
        use: ["ts-loader"],
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: miniCss.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
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
