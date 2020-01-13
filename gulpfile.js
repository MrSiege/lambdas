var gulp = require("gulp");
var tasks = require("./gulp-tasks");
var server = require("./server-config");
var argv = require("minimist")(process.argv.slice(2));
var path = require("path");

var submodules = {
  source: true,
  docs: true,
};

if (!argv.submodule) {
  console.error("Please specify module name");
  return;
}

if (!submodules[argv.submodule]) {
  console.error("not found module: " + argv.submodule);
  return;
}

var module = argv.submodule;
var dev = !argv.production;

var options = {
  entry: path.resolve(__dirname, module + "/index.js"),
  dev: dev,
  nodeRoot: "node_modules",
  dist: {
    root: "build/" + module,
    webpack: "build/" + module + "/",
    js: "build/" + module + "/js",
    css: "build/" + module + "/css"
  },
  src: {
    root: "build/" + module,
    js: module + "/modules/**/*.js",
    css: module + "/css/**/*.css",
  },
  task: {
    develop: 'develop',
    production: 'production',
    clean: "clean",
    server: "server",
    webpack: "webpack",
  },
  module: module
};

// 清理build目录
gulp.task(options.task.clean, tasks.clean(options));
// webpack
gulp.task(options.task.webpack, tasks.webpackTask(options));
// service
gulp.task(options.task.server, server(options));

if (dev) {
  gulp.task(
    options.task.develop,
    gulp.series(
      options.task.clean,
      options.task.server
    )
  );
} else {
  gulp.task(
    options.task.production,
    gulp.series(
      options.task.clean,
      options.task.webpack
    )
  );
}

gulp.task("default", gulp.series(dev ? options.task.develop : options.task.production));
