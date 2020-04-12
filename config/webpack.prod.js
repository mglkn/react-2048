const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const miniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpakcPlugin = require("workbox-webpack-plugin");
// const HtmlWebpackChangeAssetExtensionPlugin = require("html-webpack-change-assets-extension-plugin");

const rootPath = path.resolve(__dirname, "../");

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new HtmlWebpackPlugin({
      title: "React 2048",
      template: path.join(rootPath, "assets/index.hbs"),
      minify: { collapseWhitespace: true },
      // TODO: make .gz work!
      // jsExtension: ".gz",
    }),
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      test: /\.(js|css)$/,
      deleteOriginalAssets: false,
      filename: "[path].gz[query]",
    }),
    new miniCss({
      filename: "[name].[hash:8].css",
    }),
    new WorkboxWebpakcPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    // TODO: make .gz work!
    // new HtmlWebpackChangeAssetExtensionPlugin(),
  ],

  devtool: false,

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            unsafe: true,
            inline: true,
            passes: 2,
            keep_fargs: false,
          },
          output: {
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
});
