import { each } from '../array';

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的所有元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的第一个元素
 * */
function filter(dataSource, pred) {
  const result = [];
  each(dataSource, function(item) {
    if (pred(item)) {
      result.push(item);
    }
  });
  return result;
}

export default filter;