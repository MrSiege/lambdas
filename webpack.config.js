const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  stats: 'normal',
  entry: { lambdas: "./source/index.js" },
  output: {
    publicPath: "",
    filename: "[name].[hash].min.js",
    path: path.resolve(__dirname, "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin({name: "commons", filename: "commons.js"}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 1000}),
    new CleanWebpackPlugin(),
  ]
};
