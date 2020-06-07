import * as monads from '../source/monad';

describe('monad', () => {
  test('monad.maybe', () => {
    const obj = { a: { b: { c: 'piano' } } };
    const result1 = monads.maybe.of(obj);
    const result2 = monads.maybe.of(null);
    const result3 = monads.maybe.of(obj).map(v => v.a).map(v => v.b).map(v => v.c).getOrElse();
    const result4 = monads.maybe.of(obj).map(v => v.a).map(v => v.b).map(v => v.d).getOrElse('clavichord');

    expect(result1.toString()).toMatch('Wrapper monad');
    expect(result1.isWrapperJust).toEqual(true);
    expect(result1.isWrapperNothing).toEqual(false);
    expect(result2.isWrapperJust).toEqual(false);
    expect(result2.isWrapperNothing).toEqual(true);
    expect(result3).toEqual('piano');
    expect(result4).toEqual('clavichord');
  })
})