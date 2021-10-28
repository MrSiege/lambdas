const path = require('path')
const Process = require('webpackbar')

module.exports = {
  stats: 'minimal',
  mode: 'production',
  entry: path.resolve('.', 'src/index.js'),
  output: {
    path: path.resolve('.', 'dist'),
    filename: 'lambdas.min.js',

    library: 'λ',
    libraryTarget: 'umd',    
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
    new Process()
  ]
};
