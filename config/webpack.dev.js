const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    contentBase: "/assets",
    hot: true,
    port: 1337,
    open: true,
    historyApiFallback: true,
  },
});
