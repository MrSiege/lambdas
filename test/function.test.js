import * as functions from '../source/function';

describe('functions', () => {
  test('function.comparator', () => {
    const comparator = functions.comparator((v, x) => v > x);
    const result1 = comparator(1, 2);
    const result2 = comparator(2, 2);
    const result3 = comparator(3, 2);
    
    expect(result1).toEqual(-1);
    expect(result2).toEqual(0);
    expect(result3).toEqual(1);
  });
  
  test('function.iterateUntil', () => {
    const result = functions.iterateUntil((v, i) => i < 3, (i) => i);
    
    expect(result).toEqual([0, 1, 2, 3]);
  });
  
  test('function.fnull', () => {
    const func1 = functions.fnull((x, y) => x * y, 3, 3);
    const func2 = functions.fnull((x, y, z) => x + y + z, 3, 3, 6);
    const result1 = func1(null, null);
    const result2 = func1(2, null);
    const result3 = func2(null, null, null);
    expect(result1).toEqual(9);
    expect(result2).toEqual(6);
    expect(result3).toEqual(12);
  });

  test('function.curry', () => {
    const func = (a, b, c, d) => [a, b, c, d];
    const result1 = functions.curry(func, 1) (1, 2, 3, 4);
    const result2 = functions.curry(func, 2) (1) (2, 3, 4);
    const result3 = functions.curry(func, 3) (1) (2) (3, 4);
    const result4 = functions.curry(func, 4) (1) (2) (3) (4);

    expect(result1).toEqual([1, 2, 3, 4]);
    expect(result2).toEqual([1, 2, 3, 4]);
    expect(result3).toEqual([1, 2, 3, 4]);
    expect(result4).toEqual([1, 2, 3, 4]);
  });
});