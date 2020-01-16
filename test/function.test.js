const functions = require('../source/function');

test('function.comparator', () => {
  const comparator = functions.comparator((v, x) => v > x);
  const result1 = comparator(1, 2);
  const result2 = comparator(2, 2);
  const result3 = comparator(3, 2);
  
  expect(result1).toEqual(-1);
  expect(result2).toEqual(0);
  expect(result3).toEqual(1);
});

test('function.always', () => {
  const always = functions.always('wei');
  const result1 = always();
  const result2 = always();
  
  expect(result1).toEqual('wei');
  expect(result2).toEqual('wei');
});

test('function.iterateUntil', () => {
  const result = functions.iterateUntil((v, i) => i < 3, (i) => i);
  
  expect(result).toEqual([0, 1, 2, 3]);
});

test('function.fnull', () => {
  const func = functions.fnull((x, y) => x * y, 3, 3, 6);
  const result1 = func();
  const result2 = func(2);
  
  expect(result1).toEqual(9);
  expect(result2).toEqual(12);
});