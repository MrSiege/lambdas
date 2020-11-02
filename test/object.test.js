import * as objects from '../src/object';

describe('objects', () => {
  test('objects.get', () => {
    const datasource = { category: { author: 'Kafka', name: '《卡夫卡文集》' } };

    const result1 = objects.get('[category].author', datasource);
    const result2 = objects.get('[category].name', datasource);
    const result3 = objects.get('[category].a.b.c', datasource);

    expect(result1).toEqual('Kafka');
    expect(result2).toEqual('《卡夫卡文集》');
    expect(result3).toEqual(undefined);
    expect(() => objects.get('', datasource)).toThrow();
  });

  test('objects.set', () => {
    const datasource = { category: { author: 'Richard Bird', name: '《Haskell 函数式程序设计》' } };

    objects.set('[category].author', '理查德·伯德', datasource);
    objects.set('[category].name', '《Thinking Functionally with Haskell》', datasource);
    objects.set('university', '牛津大学', datasource);
    objects.set('hometown.university', '伊顿公学', datasource);

    expect(datasource.category.author).toEqual('理查德·伯德');
    expect(datasource.category.name).toEqual('《Thinking Functionally with Haskell》');
    expect(datasource.university).toEqual('牛津大学');
    expect(() => objects.set('', null, datasource)).toThrow();
  });

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