import { each } from '../array';

/**
 * 接收一个数据源参数与函数，返回按照的数据拾取函数返回数据进行统计数量的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function countBy(dataSource, pickup) {
  const groupMap = new Map();
  each(dataSource, function(item, index) {
    const countKey = pickup(item);
    const result = groupMap.get(countKey);
    if (result === undefined) {
      groupMap.set(countKey, 1);
    } else {
      groupMap.set(countKey, result + 1);
    }
  });
  const countInfo = {};
  groupMap.forEach(function(value, key, map) {
    countInfo[key] = value;
  });
  return countInfo;
}

export default countBy;