const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // resolveLoader: {
  //   modules: [
  //       path.join(__dirname, 'node_modules')
  //   ]
  // },
  resolve: {
    // alias: {
    //   components: path.resolve(__dirname, './node_modules')
    // },
    extensions: ['.ts', '.js', '.wasm'],
    // modules: [
    //   path.join(__dirname, 'node_modules')
    // ]
  }
};
