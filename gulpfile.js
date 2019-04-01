var gulp        = require('gulp');
var tasks       = require('./gulp-tasks');
var server      = require('./server-config');
var argv        = require('minimist')(process.argv.slice(2));
var path        = require('path');

var modules = {
    "functional": true,
    "tetris-game":true
};

if(!argv.module) {
    console.error("Please specify module name");
    return;
}
if(!modules[argv.module]) {
    console.error("not found module: " + argv.module);
    return;
}

var module = argv.module;
var dev = !argv.production;

var options = {
    entry: path.resolve(__dirname, module + "/js/index.js"),
    dev: dev,
    nodeRoot: "node_modules",
    dist: {
        root: "build/"+module,
        webpack: "build/"+module+"/",
        js: "build/"+module+"/js",
        css: "build/"+module+"/css"
    },
    src: {
        root: "build/"+module,
        js: module + "/modules/**/*.js",
        css:module + "/css/**/*.css",
        thirdPartyLibraries:"/third-party-libraries/**/*.js"
    },
    task: {
        clean:"clean",
        server:"server",
        develop:"develop",
        webpack: 'webpack',
        production:"production",
        packCssTask:"packCssTask",
        thirdPartyLibraries:"thirdPartyLibraries"
    },
    module: module
};

// 清理build目录
gulp.task(options.task.clean, tasks.clean(options));
// third-party libraries
gulp.task(options.task.thirdPartyLibraries, tasks.thirdPartyLibraries(options));
// webpack
gulp.task(options.task.webpack, tasks.webpackTask(options));
// css
gulp.task(options.task.packCssTask, tasks.packCssTask(options));
// service
gulp.task(options.task.server, server(options));

if(dev){
    gulp.task(options.task.develop, gulp.series(
        options.task.clean,
        options.task.thirdPartyLibraries,
        options.task.packCssTask,
        options.task.server
    ));
}else{
    gulp.task(options.task.production, gulp.series(
        options.task.clean,
        options.task.thirdPartyLibraries,
        options.task.packCssTask,
        options.task.webpack
    ));
}

gulp.task('default', gulp.series(dev ? options.task.develop : options.task.production));