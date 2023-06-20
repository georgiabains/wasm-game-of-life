const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "index.html",
        },
      ],
    }),
  ],
  experiments: {
    syncWebAssembly: true, // deprecated, see https://github.com/webpack/webpack/issues/11347
  },
  resolve: {
    extensions: ['.ts', '.js', '.wasm'],
  }
};