let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");
let browserSync = require("browser-sync").create();
let buildWebpackConfig = require("./webpack-config");

module.exports = function(options) {
  return function() {
    let webpackConfig = buildWebpackConfig(options);
    let bundle = webpack(webpackConfig);
    browserSync.init({
      server: {
        baseDir: options.dist.root,
        middleware: [
          webpackDevMiddleware(bundle, {
            publicPath: webpackConfig.output.publicPath,
            stats: { colors: true }
          }),
          webpackHotMiddleware(bundle)
        ]
      },
      port: 9986
    });
  };
};
