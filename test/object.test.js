import * as objects from '../src/object';

describe('objects', () => {
  test('objects.get', () => {
    const source = { category: { author: 'Kafka', name: '《卡夫卡文集》' } };

    const R1 = objects.get('[category].author', source);
    const R2 = objects.get('[category].name', source);
    const R3 = objects.get('[category].a.b.c', source);

    expect(R1).toEqual('Kafka');
    expect(R2).toEqual('《卡夫卡文集》');
    expect(R3).toEqual(undefined);
  });



  test('objects.set', () => {
    const source = { category: { author: 'Richard Bird', name: '《Haskell 函数式程序设计》' } };

    objects.set('university', '牛津大学', source);
    objects.set('hometown.university', '伊顿公学', source);
    objects.set('[category].author', '理查德·伯德', source);
    objects.set('[category].name', '《Thinking Functionally with Haskell》', source);

    expect(source.university).toEqual('牛津大学');
    expect(source.hometown.university).toEqual('伊顿公学');
    expect(source.category.author).toEqual('理查德·伯德');
    expect(source.category.name).toEqual('《Thinking Functionally with Haskell》');
  });



  test('objects.keys', () => {
    const source1 = { title: '《百年孤独》', author: 'Márquez' };
    const source2 = { 1: '1', 2: '4', 3: '9', 4: '16', 5: '25', 6: '36' };
    const source3 = { '0000-0010': 2, '0000-0100': 4, '0000-1000': 8, '0001-0000': 16 };

    const R1 = objects.keys(source1);
    const R2 = objects.keys(source2);
    const R3 = objects.keys(source3);

    expect(R1).toEqual(['title', 'author']);
    expect(R2).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(R3).toEqual(['0000-0010', '0000-0100', '0000-1000', '0001-0000']);
  });



  test('objects.values', () => {
    const source1 = { title: '《百年孤独》', author: 'Márquez' };
    const source2 = { 1: '1', 4: '2', 9: '3', 16: '4', 25: '5', 36: '6' };
    const source3 = { 2: '0000-0010', 4: '0000-0100', 8: '0000-1000', 16: '0001-0000' };

    const R1 = objects.values(source1);
    const R2 = objects.values(source2);
    const R3 = objects.values(source3);

    expect(R1).toEqual(['《百年孤独》', 'Márquez']);
    expect(R2).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(R3).toEqual(['0000-0010', '0000-0100', '0000-1000', '0001-0000']);
  });



  test('objects.toPairs', () => {
    const source1 = { name: '雯梓', artifact: 'Go' };
    const source2 = { name: '张良', title: 'Strategist', artifact: undefined };

    const R1 = objects.toPairs({});
    const R2 = objects.toPairs(source1);
    const R3 = objects.toPairs(source2);

    expect(R1).toStrictEqual([]);
    expect(R2).toStrictEqual([['name', '雯梓'], ['artifact', 'Go']]);
    expect(R3).toStrictEqual([['name', '张良'], ['title', 'Strategist'], ['artifact', undefined]]);
  });
});