const fs = require('fs');
const package = require("./package");
const banner = fs.readFileSync('./banner.txt','utf-8');

module.exports = `
${banner}
@license lambdas v${package.version} from ${new Date().toDateString()}
Copyright(c) William Caulfield <18371143179@163.com>
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
chunkhash: [chunkhash]
filebase: [filebase]
`