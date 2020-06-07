const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    lambdas: "./source/index.js"
  },
  devtool: "source-map",
  output: {
    filename: "[name].min.js",
    publicPath: "",
    path: path.resolve(__dirname, "./build/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin({
      name: "vendor",
      chunks: "all",
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        //打包重复出现的代码
        vendor: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: "vendor"
        },
        //打包第三方类库
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "[name].min.js.map",
      exclude: ["*.js"]
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000
    })
  ]
};
