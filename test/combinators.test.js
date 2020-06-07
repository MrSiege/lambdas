import * as combinators from '../source/combinators';

describe('combinators', () => {
  test('combinators.alt', () => {
    const func1 = combinators.alt(
      name => name === 'aliz' ? name : false,
      name => `${name} aliz`,
    );
    
    const result1 = func1('aliz');
    const result2 = func1('yuri');
    
    expect(result1).toEqual('aliz');
    expect(result2).toEqual('yuri aliz');
  })

  test('combinators.fork', () => {
    const func1 = combinators.fork(
      (a, b) => [a, b],
      a => a,
      b => b,
    );
    
    const result1 = func1('aliz');
    const result2 = func1('yuri');
    
    expect(result1).toEqual(['aliz', 'aliz']);
    expect(result2).toEqual(['yuri', 'yuri']);
  })

  test('combinators.identity', () => {
    const result1 = combinators.identity('aliz');
    
    expect(result1).toEqual('aliz');
  })

  test('combinators.seq', () => {
    const func1 = jest.fn(v => v);
    const func2 = jest.fn(v => v + 1);
    const func3 = jest.fn(v => v + 2);
    combinators.seq(func1, func2, func3)(1);
    
    expect(func1.mock.calls.length).toBe(1);
    expect(func2.mock.calls.length).toBe(1);
    expect(func3.mock.calls.length).toBe(1);

    expect(func1.mock.results).toEqual([ { type: 'return', value: 1 } ]);
    expect(func2.mock.results).toEqual([ { type: 'return', value: 2 } ]);
    expect(func3.mock.results).toEqual([ { type: 'return', value: 3 } ]);
  })

  test('combinators.tap', () => {
    const func1 = jest.fn(v => v + '大胜利');
    const result1 = combinators.tap(func1, '朝奈');
    
    expect(result1).toBe('朝奈');
    expect(func1.mock.calls.length).toBe(1);
    expect(func1.mock.results).toEqual([ { type: 'return', value: '朝奈大胜利' } ]);
  })
})