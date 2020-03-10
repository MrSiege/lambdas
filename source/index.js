const arrays = require('./array');
const collections = require('./collection');
const functions = require('./function');
const langs = require('./lang');
const objects = require('./object');
const utils = require('./utils');
const dataStructures = require('./data-structure');

const lambdaλ = {
  ...arrays,
  ...collections,
  ...functions,
  ...langs,
  ...objects,
  ...utils,
  ...dataStructures,
}

module.exports = lambdaλ;