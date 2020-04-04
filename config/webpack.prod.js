const merge = require("webpack-merge");
const common = require("./webpack.common");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const HtmlWebpackChangeAssetExtensionPlugin = require("html-webpack-change-assets-extension-plugin");

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      test: /\.(js|css)$/,
      deleteOriginalAssets: false,
      filename: "[path].gz[query]",
    }),
    // TODO: make .gz work!
    // new HtmlWebpackChangeAssetExtensionPlugin(),
  ],

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
      // new OptimizeCSSPlugin({
      //   cssProcessorOptions: {
      //     "preset": "advanced",
      //     "safe": true,
      //     "map": { "inline": false },
      //   },
      // }),
    ],
  },
});
