import * as functions from '../source/function';

test('function.comparator', () => {
  const comparator = functions.comparator((v, x) => v > x);
  const result1 = comparator(1, 2);
  const result2 = comparator(2, 2);
  const result3 = comparator(3, 2);
  
  expect(result1).toEqual(-1);
  expect(result2).toEqual(0);
  expect(result3).toEqual(1);
});

test('function.always', () => {
  const always = functions.always('wei');
  const result1 = always();
  const result2 = always();
  
  expect(result1).toEqual('wei');
  expect(result2).toEqual('wei');
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

test('function.validator and function.checker', () => {
  const validator1 = functions.validator('请填写您的姓名', v => v.name);
  const validator2 = functions.validator('请填写正确的性别', v => v.sex === 'boy' || v.sex === 'girl');
  const validator3 = functions.validator('请填写您的毕业院校', v => v.graduatedSchool);
  const checkers = functions.checker(validator1, validator2, validator3);
  
  const datasource1 = { name: 'wei', sex: 'boy', graduatedSchool: 'Cambridge University' };
  const datasource2 = { name: 'kiko', sex: 'girl', graduatedSchool: 'Kyoto University' };
  const datasource3 = { name: 'Voldemort', sex: 'male', graduatedSchool: 'Hogwarts University' };
  
  const result1 = checkers(datasource1);
  const result2 = checkers(datasource2);
  const result3 = checkers(datasource3);
  
  expect(result1).toEqual([]);
  expect(result2).toEqual([]);
  expect(result3).toEqual(['请填写正确的性别']);
});