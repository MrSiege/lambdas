import * as functions from '../source/function';

describe('functions', () => {
  test('function.comparator', () => {
    const comparator = functions.comparator((v, x) => v > x);
    const result1 = comparator(1, 2);
    const result2 = comparator(2, 2);
    const result3 = comparator(3, 2);
    
    expect(result1).toEqual(-1);
    expect(result2).toEqual(0);
    expect(result3).toEqual(1);
  });
  
  test('function.iterateUntil', () => {
    const result = functions.iterateUntil((v, i) => i < 3, (i) => i);
    
    expect(result).toEqual([0, 1, 2, 3]);
  });
  
  test('function.fnull', () => {
    const func1 = functions.fnull((x, y) => x * y, 3, 3);
    const func2 = functions.fnull((x, y, z) => x + y + z, 3, 3, 6);
    const result1 = func1(null, null);
    const result2 = func1(2, null);
    const result3 = func2(null, null, null);
    expect(result1).toEqual(9);
    expect(result2).toEqual(6);
    expect(result3).toEqual(12);
  });

  test('function.curry', () => {
    const func = (a, b, c, d) => [a, b, c, d];
    const result1 = functions.curry(func, 1) (1, 2, 3, 4);
    const result2 = functions.curry(func, 2) (1) (2, 3, 4);
    const result3 = functions.curry(func, 3) (1) (2) (3, 4);
    const result4 = functions.curry(func, 4) (1) (2) (3) (4);

    expect(result1).toEqual([1, 2, 3, 4]);
    expect(result2).toEqual([1, 2, 3, 4]);
    expect(result3).toEqual([1, 2, 3, 4]);
    expect(result4).toEqual([1, 2, 3, 4]);
  });

  test('function.flow', () => {
    const fun1 = jest.fn(v => v + 1);
    const fun2 = jest.fn(v => v + 1);
    const fun3 = jest.fn(v => v + 1);

    const fun4 = functions.flow(fun1, fun2, fun3);
    const result = fun4(0);

    // 调用次数都应该为1次
    expect(fun1.mock.calls.length).toBe(1);
    expect(fun2.mock.calls.length).toBe(1);
    expect(fun3.mock.calls.length).toBe(1);
  
    // 每个函数的第一个参数应该为 x + 1 的递增关系，并且函数序列的调用顺序是从左至右
    expect(fun1.mock.calls[0][0]).toBe(0);
    expect(fun2.mock.calls[0][0]).toBe(1);
    expect(fun3.mock.calls[0][0]).toBe(2);

    // 结果应该为 3
    expect(result).toBe(3);
  });

  test('function.compose', () => {
    const fun1 = jest.fn(v => v + 1);
    const fun2 = jest.fn(v => v + 1);
    const fun3 = jest.fn(v => v + 1);

    const fun4 = functions.compose(fun1, fun2, fun3);
    const result = fun4(0);

    // 调用次数都应该为1次
    expect(fun1.mock.calls.length).toBe(1);
    expect(fun2.mock.calls.length).toBe(1);
    expect(fun3.mock.calls.length).toBe(1);
  
    // 每个函数的第一个参数应该为 x + 1 的递增关系，并且函数序列的调用顺序是从右至左
    expect(fun3.mock.calls[0][0]).toBe(0);
    expect(fun2.mock.calls[0][0]).toBe(1);
    expect(fun1.mock.calls[0][0]).toBe(2);

    // 结果应该为 3
    expect(result).toBe(3);
  });

  test('function.invoker', () => {
    const fun1 = functions.invoker('toString', Array.prototype.toString);
    const fun2 = functions.invoker('toString', String.prototype.toString);

    const data1= [1, 2, 3];
    const data2 = '123';
    const result1 = fun1(data1);
    const result2 = fun1(data2);
    const result3 = fun2(data2);

    expect(data1).toStrictEqual([1, 2, 3]);
    expect(data2).toBe('123');
    expect(result1).toBe('1,2,3');
    expect(result2).toBe(undefined);
    expect(result3).toBe('123');
  })

  test('function.dispatch', () => {
    class Person {
      constructor(name, sex){
        this.name= name;
        this.sex = sex;
      }
      toString(){
        const { name, sex } = this;
        return `her name is ${name}, A cute little ${sex}`
      }
    }

    const fun1 = jest.fn(functions.invoker('toString', Array.prototype.toString));
    const fun2 = jest.fn(functions.invoker('toString', String.prototype.toString));
    const fun3 = jest.fn(functions.invoker('toString', Person.prototype.toString));
    const polymorphismfn = functions.dispatch(fun1, fun2, fun3);

    const data1 = new Person('艾莉兹', 'girl');
    const data2 = 100236;
    const data3 = [ 'piano', 'violin', 'Lyre' ];

    const result1 = polymorphismfn(data1);
    const result2 = polymorphismfn(data2);
    const result3 = polymorphismfn(data3);

    expect(data1).toStrictEqual(new Person('艾莉兹', 'girl'));
    expect(data2).toBe(100236);
    expect(data3).toStrictEqual([ 'piano', 'violin', 'Lyre' ]);

    expect(result1).toBe('her name is 艾莉兹, A cute little girl');
    expect(result2).toBe(undefined);
    expect(result3).toBe('piano,violin,Lyre');
  })
});