const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(options) {
  // index.html 管理插件
  let htmlPlugin = new HtmlWebpackPlugin({
    filename: "index.html",
    template: options.module + "/index.html",
    inject: true,
    chunksSortMode: "dependency"
  });
  // common js 打包插件
  let splitChunksPlugin = new webpack.optimize.SplitChunksPlugin({
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
  });
  
  // 源代码映射插件
  const sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
    filename: "js/[name].[hash:8].min.js.map",
    exclude: ["js/*.js"]
  });
  
  // Js 源代码稠化插件
  let minChunkSizePlugin = new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 10000
  });
  let plugins = options.dev ? [htmlPlugin] : [htmlPlugin, splitChunksPlugin, minChunkSizePlugin];
  
  return {
    mode: options.dev ? "development" : "production",
    entry: {
      app: options.entry
    },
    devtool: "inline-source-map",
    output: {
      filename: "js/[name].[hash:8].bundle.js",
      publicPath: "",
      path: path.resolve(__dirname, options.dist.root)
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
    plugins: plugins
  };
};
