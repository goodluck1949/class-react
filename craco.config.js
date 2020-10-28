const path = require("path");
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
  webpack: {
    alias: {
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@comps": path.resolve(__dirname, "./src/components"),
    },
  },
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375,
        }),
      ],
    },
  },
};
