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
    const datasource3 = { name: 'Luna', sex: 'female', graduatedSchool: 'Hogwarts Ravenclaw University' };
    
    const result1 = checkers(datasource1);
    const result2 = checkers(datasource2);
    const result3 = checkers(datasource3);

    const mockCallback = jest.fn();
    utils.validation.notify(mockCallback, result1);
    utils.validation.notify(mockCallback, result2);
    utils.validation.notify(mockCallback, result3);
    utils.validation.notify(mockCallback, [result1, result2, result3]);

    expect(result1.result).toEqual(true);
    expect(result2.messages).toEqual([]);
    expect(result3.messages).toEqual(['请填写正确的性别']);

    expect(mockCallback.mock.calls.length).toEqual(2);
    expect(mockCallback.mock.calls[0][0]).toEqual('请填写正确的性别');
    expect(mockCallback.mock.calls[1][0]).toEqual('请填写正确的性别');
  })

  test('utils.other', () => {
    utils.note('测试开始');
    utils.warning('下面是我喜欢的书的书摘');
    
    utils.documentWriteln('《百年孤独》－加西亚·马尔克斯');
    utils.documentWrite('在令人窒息的舱室里，在铁皮舱壁的摇晃和桨轮搅起的淤泥臭气中，梅梅昏昏沉沉，不辨日期。');
    utils.documentWrite('蕾梅黛丝在蠹虫如沙漏般的暗地蛀蚀中，蕾梅黛丝在清晨面包的热气中，蕾梅黛丝无处不在，蕾梅黛丝无时或缺。');
    utils.documentWrite('那里的石板路上回响着三十二座教堂的丧钟齐鸣。');

    utils.documentWriteln('《奇风岁月》－罗伯特·麦卡蒙');
    utils.documentWrite(`有一天早上，我忽然发现群山已经染上了一片金黄，一片红艳，仿佛魔法师魔杖一挥，森林一夕之间变色。`);

    utils.documentWriteln('《在细雨中呼喊》－余华');
    utils.documentWrite('生者将死者埋葬以后，死者便永远躺在哪那里，而生者继续走动。这真实的场景是时间给予依然浪迹在现实里的人的暗示。');

    utils.documentWriteln('《兄弟》－余华');
    utils.documentWrite('李光头和宋刚像野草一样被脚步踩了又踩，被车轮碾了又碾，可是依然生机勃勃地成长起来了。');
  })
})