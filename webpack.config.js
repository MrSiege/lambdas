const path = require("path");
const package = require("./package");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  stats: 'normal',
  mode: 'production',
  entry: './source/index.js',
  output: {
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
    new CleanWebpackPlugin(),
  ]
};
