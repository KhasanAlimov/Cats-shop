module.exports = {
  plugins: [
    "autoprefixer",
    "css-mqpacker",
    "cssnano"({
      present: [
        "default",
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
