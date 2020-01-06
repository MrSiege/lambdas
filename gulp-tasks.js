var gulp = require("gulp");
var gulpClean = require("gulp-clean");
var gulpWebpack = require("gulp-webpack");
var webpack = require("webpack");
var webpackConfig = require("./webpack-config");

/**
 * 清除任务
 * @param {object} options 应用配置参数
 * @return {function} 清除任务执行函数
 * */
var clean = function clean(options) {
  return function() {
    return gulp
      .src(options.src.root + "/**/*", { read: false })
      .pipe(gulpClean({ read: false }));
  };
};

/**
 * webpack
 * @return {function} 执行函数
 * */
var webpackTask = function webpackTask(options) {
  return function() {
    return gulp
      .src(options.entry)
      .pipe(gulpWebpack(webpackConfig(options), webpack))
      .pipe(gulp.dest(options.dist.webpack));
  };
};

module.exports = {
  clean: clean,
  webpackTask: webpackTask
};
