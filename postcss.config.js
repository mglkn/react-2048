module.exports = {
  plugins: [
    require("postcss-normalize"),
    require("autoprefixer"),
    require("postcss-flexbugs-fixes"),
    require("css-mqpacker"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComents: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
