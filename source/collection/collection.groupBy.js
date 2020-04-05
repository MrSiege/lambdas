import { each } from '../array';

/**
 * 接收一个数据源参数与函数，返回按照数据拾取函数返回数据进行分组的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function groupBy(dataSource, pickup) {
  const groupMap = new Map(),
  dataSourceMirroring = [];

  each(dataSource, function(item, index) {
    const groupKey = pickup(item);
    const result = groupMap.get(groupKey);
    if (result === undefined) {
      groupMap.set(groupKey, [item]);
    } else {
      result.push(item);
    }
  });

  groupMap.forEach(function(value, key, map) {
    const object = {};
    object[key] = value;
    dataSourceMirroring.push(object);
  });

  return dataSourceMirroring;
}

export default groupBy;