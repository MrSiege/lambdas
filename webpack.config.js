const path = require("path");
const webpack = require("webpack");
const package = require("./package");
const banner = require("./banner");
const Webpackbar = require('webpackbar');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  stats: 'normal',
  mode: 'development',
  entry: './src/index.js',
  output: {
    library: 'Lambdas',
    libraryTarget: 'umd',
    filename: 'lambdas.min.js',
    path: path.resolve(__dirname, `./dist/${package.version}`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new Webpackbar(),
    new webpack.BannerPlugin(banner),
    new CleanWebpackPlugin(),
  ]
};
