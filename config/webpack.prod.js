const merge = require("webpack-merge");
const common = require("./webpack.common");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  plugins: [new CompressionWebpackPlugin()],

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
