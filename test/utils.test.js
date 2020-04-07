import * as utils from '../source/utils';

test('utils.fail', () => {
  expect(utils.fail).toThrow();
});

test('utils.uuid', () => {
  const uuid = utils.uuid();

  expect(uuid.length).toEqual(36);
});