import * as utils from '../src/utils';
import * as combinators from '../src/combinators';

describe('utils', () => {
  test('utils.fail', () => {
    expect(utils.fail).toThrow();
  })

  test('utils.times', () => {
    const result1 = utils.times(combinators.identity, 6);
    const result2 = utils.times(v => v * 2, 6);
    const result3 = utils.times(v => v * v, 6);

    console.log(result1);
    console.log(result2);
    console.log(result3);
    
    expect(result1).toEqual([0, 1, 2, 3, 4, 5]);
    expect(result2).toEqual([0, 2, 4, 6, 8, 10]);
    expect(result3).toEqual([0, 1, 4, 9, 16, 25]);
  })
  
  test('utils.uuid', () => {
    const uuid1 = utils.uuid();
    const uuid2 = utils.uuid();
    const uuid3 = utils.uuid();
    const uuid4 = utils.uuid();

    console.log(`uuid: ${uuid1}`);
    console.log(`uuid: ${uuid2}`);
    console.log(`uuid: ${uuid3}`);
    console.log(`uuid: ${uuid4}`);

    expect(uuid1.length).toEqual(36);
  })

  test('utils.validation', () => {
    const checkers = utils.validation([
      utils.validation.test('请填写您的姓名', v => v.name),
      utils.validation.test('请填写正确的性别', v => ({ boy: 1, girl: 1 }[v.sex])),
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