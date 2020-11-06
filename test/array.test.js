import * as arrays from '../src/array';

describe('arrays', () => {
  test('arrays.nth', () => {
    const datasrouce = ['1', '2', '3'];
    
    expect(arrays.nth(datasrouce, 2)).toEqual(datasrouce[2]);
  })



  test('arrays.each', () => {
    const datasrouce = ['1', '2', '3'];
    const mockCallback = jest.fn();
    arrays.each(datasrouce, mockCallback);
    
    expect(mockCallback.mock.calls.length).toEqual(datasrouce.length);
    expect(mockCallback.mock.calls[0][0]).toEqual(datasrouce[0]);
  })



  test('arrays.flatten', () => {
    const result1 = arrays.flatten(['1', ['2', '3'], ['4', '5', '6']]);
    const result2 = arrays.flatten(['1', '2', '3', '4', '5', '6']);
    const result3 = arrays.flatten([['1', '2', '3', '4', '5', '6']]);
    
    expect(result1).toStrictEqual(['1', '2', '3', '4', '5', '6']);
    expect(result2).toStrictEqual(['1', '2', '3', '4', '5', '6']);
    expect(result3).toStrictEqual(['1', '2', '3', '4', '5', '6']);
  })



  test('arrays.flattenDeep', () => {
    const result1 = arrays.flattenDeep(['1', ['2', ['3']], ['4', ['5', ['6']]]]);
    const result2 = arrays.flattenDeep(['1', '2', [['3', ['4']]], '5', '6']);
    const result3 = arrays.flattenDeep([['1', '2', '3', '4', '5', '6']]);
    
    expect(result1).toStrictEqual(['1', '2', '3', '4', '5', '6']);
    expect(result2).toStrictEqual(['1', '2', '3', '4', '5', '6']);
    expect(result3).toStrictEqual(['1', '2', '3', '4', '5', '6']);
  })



  test('arrays.fromPairs', () => {
    const data1 = [['name', '雯梓'], ['artifact', 'Go']];
    const data2 = [['name', '张良'], ['title', 'Strategist'], ['artifact']];
    const result1 = arrays.fromPairs(data1);
    const result2 = arrays.fromPairs(data2);
    const result3 = arrays.fromPairs([]);
    
    expect(result1).toStrictEqual({ name: '雯梓', artifact: 'Go' });
    expect(result2).toStrictEqual({ name: '张良', title: 'Strategist', artifact: undefined });
    expect(result3).toStrictEqual({});
  })



  test('arrays.map', () => {
    const datasrouce = ['1', '2', '3'];
    const mockCallback = jest.fn();
    arrays.map(datasrouce, mockCallback);
    const result = arrays.map(datasrouce, v => v);
    
    expect(mockCallback.mock.calls.length).toEqual(datasrouce.length);
    expect(mockCallback.mock.calls[0][0]).toEqual(datasrouce[0]);
    expect(result).toEqual(datasrouce);
  })



  test('arrays.construct', () => {
    const datasrouce = ['1', '2', '3'];
    const param = '0';
    
    expect(arrays.construct(param, datasrouce)).toEqual([param, ...datasrouce]);
  })



  test('arrays.reverse', () => {
    const data1 = [1, 2, 3];
    const data2 = [3, 2, 1];
    
    const result1 = arrays.reverse(data1);
    const result2 = arrays.reverse(data2);

    expect(result1).toStrictEqual(data2);
    expect(result2).toStrictEqual(data1);
  })
  
  test('arrays.sortBy', () => {
    const datasrouce = ['4', '2', '3'];
    const result = arrays.sortBy(datasrouce, v => v);
    
    expect(result).toEqual(['2', '3', '4']);
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

    expect(arrays.zip(source1)).toEqual(target1);
    expect(arrays.zip(source2)).toEqual(target2);
    expect(arrays.zip(source3)).toEqual(target3);
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