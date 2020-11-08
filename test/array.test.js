import * as arrays from '../src/array';

describe('arrays', () => {
  test('arrays.construct', () => {
    const source1 = [1, 2, 3];
    const source2 = [2, 4, 6];
    const source3 = [3, 9, 81];
    
    const result1 = arrays.construct(0, source1);
    const result2 = arrays.construct(0, source2);
    const result3 = arrays.construct(0, source3);

    expect(result1).toEqual([0, ...source1]);
    expect(result2).toEqual([0, ...source2]);
    expect(result3).toEqual([0, ...source3]);
  })

  test('arrays.each', () => {
    const source1 = [1, 2, 3];
    const source2 = [2, 4, 6];
    const source3 = [9, 12, 15];

    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();

    arrays.each(source1, callback1);
    arrays.each(source2, callback2);
    arrays.each(source3, callback3);

    expect(callback1.mock.calls[0]).toEqual([ 1, 0, source1 ]);
    expect(callback1.mock.calls[1]).toEqual([ 2, 1, source1 ]);
    expect(callback1.mock.calls[2]).toEqual([ 3, 2, source1 ]);
    expect(callback2.mock.calls[0]).toEqual([ 2, 0, source2 ]);
    expect(callback2.mock.calls[1]).toEqual([ 4, 1, source2 ]);
    expect(callback2.mock.calls[2]).toEqual([ 6, 2, source2 ]);
    expect(callback3.mock.calls[0]).toEqual([ 9, 0, source3 ]);
    expect(callback3.mock.calls[1]).toEqual([ 12, 1, source3 ]);
    expect(callback3.mock.calls[2]).toEqual([ 15, 2, source3 ]);
  })

  test('arrays.flatten', () => {
    const source1 = [[1], [2, 3], [4, 5, 6]];
    const source2 = [[2, 4], [6, 8], [10], 12];
    const source3 = [[], [9, 12, 15, 18,  21]];
    
    const result1 = arrays.flatten(source1);
    const result2 = arrays.flatten(source2);
    const result3 = arrays.flatten(source3);
    
    expect(result1).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(result2).toStrictEqual([2, 4, 6, 8, 10, 12]);
    expect(result3).toStrictEqual([9, 12, 15, 18, 21]);
  })

  test('arrays.flattenDeep', () => {
    const source1 = [[1], [[2], 3], [[4], 5, 6]];
    const source2 = [[2, 4], [6, [8]], [10], 12];
    const source3 = [[[], [9, 12, 15, 18,  21]]];

    const result1 = arrays.flattenDeep(source1);
    const result2 = arrays.flattenDeep(source2);
    const result3 = arrays.flattenDeep(source3);

    expect(result1).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(result2).toStrictEqual([2, 4, 6, 8, 10, 12]);
    expect(result3).toStrictEqual([9, 12, 15, 18, 21]);
  })

  test('arrays.fromPairs', () => {
    const source1 = [['name', '雯梓'], ['artifact', 'Go']];
    const source2 = [['name', '张良'], ['title', 'Strategist']];
    const source3 = [['name', 'Lily'], ['book', 'Set theory']];

    const result1 = arrays.fromPairs(source1);
    const result2 = arrays.fromPairs(source2);
    const result3 = arrays.fromPairs(source3);
    
    expect(result1).toStrictEqual({ name: '雯梓', artifact: 'Go' });
    expect(result2).toStrictEqual({ name: '张良', title: 'Strategist' });
    expect(result3).toStrictEqual({ name: 'Lily', book: 'Set theory' });
  })

  test('arrays.map', () => {
    const source1 = [1, 2, 3, 4, 5, 6];
    const source2 = [1, 4, 6, 8, 10, 12];
    const source3 = [2, 6, 9, 12, 15, 18];

    const result1 = arrays.map(source1, v => v * 2);
    const result2 = arrays.map(source2, v => v / 2);
    const result3 = arrays.map(source3, v => v + 1);

    expect(result1).toEqual([2, 4, 6, 8, 10, 12]);
    expect(result2).toEqual([0.5, 2, 3, 4, 5, 6]);
    expect(result3).toEqual([3, 7, 10, 13, 16, 19]);
  })

  test('arrays.nth', () => {
    const source1 = [1, 2, 3, 4, 5, 6];
    const source2 = ['洋子', '菲尔德', '莎尔'];
    const source3 = [[2, 4], [4, 16], [8, 64]];

    const result1 = arrays.nth(source1, 5);
    const result2 = arrays.nth(source2, 0);
    const result3 = arrays.nth(source3, 1);

    expect(result1).toEqual(6);
    expect(result2).toEqual('洋子');
    expect(result3).toEqual([4, 16]);
  })

  test('arrays.reverse', () => {
    const source1 = [1, 2, 3, 4, 5 ,6];
    const source2 = [6, 5, 4, 3, 2, 1];
    const source3 = '++-*-++'.split('');

    const result1 = arrays.reverse(source1);
    const result2 = arrays.reverse(source2);
    const result3 = arrays.reverse(source3);

    expect(result1).toStrictEqual([6, 5, 4, 3, 2, 1]);
    expect(result2).toStrictEqual([1, 2, 3, 4, 5 ,6]);
    expect(result3).toStrictEqual('++-*-++'.split(''));
  })

  test('arrays.sortBy', () => {
    const source1 = [3, 1, 6, 3, 4, 5];
    const source2 = [6, 5, 4, 3, 2, 1];
    const source3 = [6, 5, 5, 1, 2, 1];

    const result1 = arrays.sortBy(source1);
    const result2 = arrays.sortBy(source2);
    const result3 = arrays.sortBy(source3);

    expect(result1).toEqual([ 1, 3, 3, 4, 5, 6 ]);
    expect(result2).toEqual([ 1, 2, 3, 4, 5, 6 ]);
    expect(result3).toEqual([ 1, 1, 2, 5, 5, 6 ]);
  })

  test('arrays.uniq', () => {
    const music1 = { name: '春江花月夜', type: '民乐合奏' };
    const music2 = { name: '姑苏行', type: '笛子独奏' };
    const music3 = { name: '广陵散', type: '瑶琴独奏' };

    const dataSource1 = [1, 2, 3, 4, 5, 3, 5, 2];
    const dataSource2 = ['Yoko', 'Lily', 'Lily'];
    const dataSource3 = [music1, music2, music1, music3, music2];

    const result1 = arrays.uniq(dataSource1);
    const result2 = arrays.uniq(dataSource2);
    const result3 = arrays.uniq(dataSource3);

    expect(result1).toEqual([1, 2, 3, 4, 5]);
    expect(result2).toEqual(['Yoko', 'Lily']);
    expect(result3).toEqual([music1, music2, music3]);
  })

  test('arrays.unzip', () => {
    const target1 = [[1, 2, 3], ['one', 'two', 'three']];
    const source1 = [[1, 'one'], [2, 'two'], [3, 'three']];

    const target2 = [[1, 2, 3], ['one', 'two', undefined]];
    const source2 = [[1, 'one'], [2, 'two'], [3]];

    const target3 = [[1, undefined, 3], ['one', 'two', null]];
    const source3 = [[1, 'one'], [undefined, 'two'], [3, null]];

    expect(arrays.unzip(source1)).toEqual(target1);
    expect(arrays.unzip(source2)).toEqual(target2);
    expect(arrays.unzip(source3)).toEqual(target3);
  })

  test('arrays.zip', () => {
    const target1 = [[1, 2, 3], ['one', 'two', 'three']];
    const source1 = [[1, 'one'], [2, 'two'], [3, 'three']];

    const target2 = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    const source2 = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];

    const target3 = [[1, undefined, 3], ['one', 'two', null]];
    const source3 = [[1, 'one'], [undefined, 'two'], [3, null]];

    expect(arrays.zip(target1)).toEqual(source1);
    expect(arrays.zip(target2)).toEqual(source2);
    expect(arrays.zip(target3)).toEqual(source3);
  })
})