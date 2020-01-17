const utils = require('../source/utils');

test('utils.fail', () => {
  expect(utils.fail).toThrow();
});