const path = require("path");

const merge = require("webpack-merge");
const common = require("./webpack.common");
const miniCss = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",

  devServer: {
    contentBase: path.resolve(__dirname, "../build"),
    port: 1337,
    open: true,
    overlay: true,
    historyApiFallback: true,
  },

  plugins: [
    new miniCss({
      filename: "[name].css",
    }),
  ],
});
