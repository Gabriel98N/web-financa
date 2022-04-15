const path = require("path");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "whatwg-fetch", "/js/script"],
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "index.js",
  },
};
