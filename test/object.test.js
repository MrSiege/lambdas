import * as objects from '../source/object';

describe('objects', () => {
  test('objects.keys', () => {
    const datasource = {title: 'One Hundred Years of Solitude', author: 'Márquez'};
    const result1 = objects.keys(datasource);
    
    expect(result1).toEqual(['title', 'author']);
  });
  
  test('objects.values', () => {
    const datasource = {title: 'One Hundred Years of Solitude', author: 'Márquez'};
    const result1 = objects.values(datasource);
    
    expect(result1).toEqual(['One Hundred Years of Solitude', 'Márquez']);
  });

  test('objects.toPairs', () => {
    const data1 = { name: '雯梓', artifact: 'Go' };
    const data2 = { name: '张良', title: 'Strategist', artifact: undefined };
    const result1 = objects.toPairs(data1);
    const result2 = objects.toPairs(data2);
    const result3 = objects.toPairs({});
    
    expect(result1).toStrictEqual([['name', '雯梓'], ['artifact', 'Go']]);
    expect(result2).toStrictEqual([['name', '张良'], ['title', 'Strategist'], ['artifact']]);
    expect(result3).toStrictEqual([]);
  });
});