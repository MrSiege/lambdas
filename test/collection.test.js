import * as collections from '../src/collection';

describe('collections', () => {
  test('collections.allof', () => {
    const datasrouce1 = [true, false, true];
    const datasrouce2 = [{result: true}, {result: true}, {result: true}];
    
    expect(collections.allof(datasrouce1, v => v)).toEqual(false);
    expect(collections.allof(datasrouce2, v => v.result)).toEqual(true);
  });
  
  test('collections.anyof', () => {
    const datasrouce1 = [true, false, true];
    const datasrouce2 = [{result: true}, {result: true}, {result: true}];
    
    expect(collections.anyof(datasrouce1, v => v)).toEqual(true);
    expect(collections.anyof(datasrouce2, v => v.result)).toEqual(true);
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

  test('collections.head and collections.tail', () => {
    const array = [1, 2, 3];
    const head = collections.head(array);
    const tail = collections.tail(array);

    expect(head).toBe(1);
    expect(tail).toStrictEqual([2, 3]);
    expect(array).toStrictEqual([1, 2, 3]);
  });
})