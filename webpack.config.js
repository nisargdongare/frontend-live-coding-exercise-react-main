const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      "fs": false, // fs cannot be polyfilled, so we set it to false
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "process": require.resolve("process/browser")
    },
  },
};
