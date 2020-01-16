const collections = require('../source/collection');

test('collections.allOf', () => {
  const datasrouce1 = [true, false, true];
  const datasrouce2 = [{result: true}, {result: true}, {result: true}];
  
  expect(collections.allOf(datasrouce1, v => v)).toEqual(false);
  expect(collections.allOf(datasrouce2, v => v.result)).toEqual(true);
});

test('collections.anyOf', () => {
  const datasrouce1 = [true, false, true];
  const datasrouce2 = [{result: true}, {result: true}, {result: true}];
  
  expect(collections.anyOf(datasrouce1, v => v)).toEqual(true);
  expect(collections.anyOf(datasrouce2, v => v.result)).toEqual(true);
});

test('collections.filter', () => {
  const datasrouce1 = [true, false, true];
  const datasrouce2 = [{result: true}, {result: true}, {result: true}];
  
  expect(collections.filter(datasrouce1, v => v)).toEqual([true, true]);
  expect(collections.filter(datasrouce2, v => false)).toEqual([]);
});

test('collections.find', () => {
  const datasrouce1 = ['1', '2', '3'];
  
  expect(collections.find(datasrouce1, v => v === '2')).toEqual('2');
});

test('collections.complement', () => {
  const datasrouce1 = [true, false, true];
  const filter =  collections.complement(v => v);
  expect(collections.filter(datasrouce1, filter)).toEqual([false]);
});

test('collections.groupBy', () => {
  const datasrouce1 = [1, 1, 2];
  const result =  collections.groupBy(datasrouce1, v => v);
  
  expect(result).toEqual( [ { '1': [ 1, 1 ] }, { '2': [ 2 ] } ]);
});

test('collections.countBy', () => {
  const datasrouce1 = [1, 1, 2];
  const result =  collections.countBy(datasrouce1, v => v);
  
  expect(result).toEqual({ '1': 2, '2': 1 });
});

test('collections.pluck', () => {
  const datasrouce1 = [{name: 'wei'}, {name: 'kiko'}];
  const result =  collections.pluck(datasrouce1, 'name');
  
  expect(result).toEqual(['wei', 'kiko']);
});

test('collections.reduce', () => {
  const datasrouce1 = [{name: 'wei'}, {name: 'kiko'}];
  const result =  collections.reduce(datasrouce1, (sum, v) => sum.concat(v.name), []);
  
  expect(result).toEqual(["wei", "kiko"]);
});

test('collections.best', () => {
  const datasrouce1 = [{name: 'wei'}, {name: 'kiko'}];
  const result =  collections.best(datasrouce1, (v, x) => v.length > x.length);
  
  expect(result).toEqual({name: 'kiko'});
});