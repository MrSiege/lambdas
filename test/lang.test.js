const langs = require('../source/lang');

test('langs.isString', () => {
  const result1 = langs.isString(1);
  const result2 = langs.isString('1');
  
  expect(result1).toEqual(false);
  expect(result2).toEqual(true);
});

test('langs.isNumber', () => {
  const result1 = langs.isNumber(1);
  const result2 = langs.isNumber('1');
  
  expect(result1).toEqual(true);
  expect(result2).toEqual(false);
});

test('langs.isNaN', () => {
  const result1 = langs.isNaN(1);
  const result2 = langs.isNaN(NaN);
  
  expect(result1).toEqual(false);
  expect(result2).toEqual(true);
});

test('langs.isArray', () => {
  const result1 = langs.isArray(1);
  const result2 = langs.isArray([2]);
  
  expect(result1).toEqual(false);
  expect(result2).toEqual(true);
});

test('langs.isFunction', () => {
  const result1 = langs.isFunction(() => null);
  const result2 = langs.isFunction(function(){});
  const result3 = langs.isFunction({});

  expect(result1).toEqual(true);
  expect(result2).toEqual(true);
  expect(result3).toEqual(false);
});

test('langs.isObject', () => {
  const result1 = langs.isObject(() => null);
  const result2 = langs.isObject('～～～');
  const result3 = langs.isObject({});
  
  expect(result1).toEqual(false);
  expect(result2).toEqual(false);
  expect(result3).toEqual(true);
});

test('langs.isIndexed', () => {
  const result1 = langs.isIndexed({});
  const result2 = langs.isIndexed([]);
  const result3 = langs.isIndexed('1900');
  
  expect(result1).toEqual(false);
  expect(result2).toEqual(true);
  expect(result3).toEqual(true);
});

test('langs.exist', () => {
  const result1 = langs.exist({});
  const result2 = langs.exist(undefined);
  const result3 = langs.exist(null);
  
  expect(result1).toEqual(true);
  expect(result2).toEqual(false);
  expect(result3).toEqual(false);
});

test('langs.truest', () => {
  const result1 = langs.truest({});
  const result2 = langs.truest(undefined);
  const result3 = langs.truest(null);
  
  expect(result1).toEqual(true);
  expect(result2).toEqual(false);
  expect(result3).toEqual(false);
});

test('langs.toArray', () => {
  const result1 = langs.toArray({x: '1', y: '2', z: '3'});
  const result2 = langs.toArray([1, 2, 3]);
  
  expect(result1).toEqual(['1', '2', '3']);
  expect(result2).toEqual([1, 2, 3]);
});

test('langs.doWhen', () => {
  const result1 = langs.doWhen(true, () => 'Aha～～～');
  const result2 = langs.doWhen(null, () => 'Aha!');
  const result3 = langs.doWhen(900, () => 'Congratulations on your admission');

  expect(result1).toEqual('Aha～～～');
  expect(result2).toEqual(undefined);
  expect(result3).toEqual('Congratulations on your admission');
});

test('langs.duplicate', () => {
  const datasource = { name: 'wei', title: 'Swordsman', age: '23', companion: 'kiko' };
  const result1 = langs.duplicate(datasource);
  const result2 = result1 === datasource;
  expect(result1).toEqual({ name: 'wei', title: 'Swordsman', age: '23', companion: 'kiko' });
  expect(result2).toEqual(false);
});