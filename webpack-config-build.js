const path = require("path");

module.exports = {
  mode: "production",
  entry: ["@babel/polyfill", "whatwg-fetch", "/js/script"],
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "index.js",
  },
};
