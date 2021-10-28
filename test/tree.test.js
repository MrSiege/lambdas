import { Tree } from '../src/struct';

describe('struct tree', () => {
  test('tree.constructor', () => {
    const node1 = Tree.of({ title: '诗歌' });
    const node2 = Tree.of({ title: '小说' });
    const node3 = Tree.of({ title: '散文' });
    const node4 = Tree.of({ title: '童话' });
    const node5 = Tree.of({ title: '文学' }, [node1, node2, node3, node4]);

    expect(node1.data.title).toEqual('诗歌');
    expect(node1.children).toEqual([]);
    expect(node5.data.title).toEqual('文学');
    expect(node5.children).toEqual([node1, node2, node3, node4]);
  });



  test('tree.map', () => {
    const source = (
      Tree.of('范畴论', [
        Tree.of('拓扑学'),
        Tree.of('代数学'),
        Tree.of('集合论'),
        Tree.of('数论', [
          Tree.of('初等数论'),
          Tree.of('高等数论'),
          Tree.of('代数数论'),
        ]),
      ])
    );

    const names = (
      (new Map())
      .set('范畴论', 'Category theory')
      .set('拓扑学', 'Topology')
      .set('代数学', 'Algebra')
      .set('集合论', 'Set theory')
      .set('数论', 'Number Theory')
      .set('初等数论', 'Elementary number theory')
      .set('高等数论', 'Higher number theory')
      .set('代数数论', 'Algebraic number theory')
    );

    const rename = v => names.get(v);
    const result = source.map(rename);

    expect(result).not.toStrictEqual(source);
    expect(result.data).toEqual('Category theory');
    expect(result.children[0].data).toEqual('Topology');
    expect(result.children[3].children[2].data).toEqual('Algebraic number theory');
  });



  test('tree.find', () => {
    const tree = Tree.of({ title: '乐器' }, [
      Tree.of({ title: '钢琴' }, [
        Tree.of({ title: '古钢琴' }),
        Tree.of({ title: '羽键钢琴' }),
        Tree.of({ title: '现代钢琴' }, [
          Tree.of({ title: '立式钢琴' }),
          Tree.of({ title: '三角钢琴' }),
        ]),
      ]),
      Tree.of({ title: '古琴' }),
      Tree.of({ title: '吉他' }, [
        Tree.of({ title: '古典吉他' }),
        Tree.of({ title: '民瑶吉他' }),
      ]),
      Tree.of({ title: '萧' }, [
        Tree.of({ title: '琴萧' }),
        Tree.of({ title: '洞萧' }),
      ]),
    ]);

    const result1 = tree.find(v => v.title === '乐器');
    const result2 = tree.find(v => v.title === '古钢琴');
    const result3 = tree.find(v => v.title === '琴萧');
    const result4 = tree.find(v => v.title === '小提琴');

    expect(result1.data.title).toEqual('乐器');
    expect(result2.data.title).toEqual('古钢琴');
    expect(result3.data.title).toEqual('琴萧');
    expect(result4).toEqual(undefined);
  });
});