import * as utils from '../source/utils';

describe('utils', () => {
  test('utils.fail', () => {
    expect(utils.fail).toThrow();
  })
  
  test('utils.uuid', () => {
    const uuid = utils.uuid();
    expect(uuid.length).toEqual(36);
  })

  test('utils.validation', () => {
    const checkers = utils.validation([
      utils.validation.test('请填写您的姓名', v => v.name),
      utils.validation.test('请填写正确的性别', v => v.sex === 'boy' || v.sex === 'girl'),
      utils.validation.test('请填写您的毕业院校', v => v.graduatedSchool),
    ]);
    
    const datasource1 = { name: 'wei', sex: 'boy', graduatedSchool: 'Cambridge University' };
    const datasource2 = { name: 'kiko', sex: 'girl', graduatedSchool: 'Kyoto University' };
    const datasource3 = { name: 'Voldemort', sex: 'male', graduatedSchool: 'Hogwarts University' };
    
    const result1 = checkers(datasource1);
    const result2 = checkers(datasource2);
    const result3 = checkers(datasource3);
    
    expect(result1.result).toEqual(true);
    expect(result2.messages).toEqual([]);
    expect(result3.messages).toEqual(['请填写正确的性别']);
  })
})