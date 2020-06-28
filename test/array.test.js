import * as arrays from '../source/array';

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
  
  test('arrays.zip', () => {
    const datasrouce1 = ['1'];
    const datasrouce2 = ['1', '2'];
    const result = arrays.zip(datasrouce1, datasrouce2);
  
    expect(result).toEqual([['1', '1'], ['2']]);
  })
  
  test('arrays.unzip', () => {
    const datasrouce1 = ['1', '3', '4'];
    const datasrouce2 = ['1', '2'];
    const result1 = arrays.zip(datasrouce1, datasrouce2);
    const result2 = arrays.unzip(result1);
    
    expect(result2).toEqual([datasrouce1, datasrouce2]);
  })
})