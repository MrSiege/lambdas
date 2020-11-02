import { isIndexed } from '../lang';
import { fail } from '../utils';

/**
 * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
 * @param {object} dataSource 数据源参数
 * @param {function} itemAction 遍历行为
 * @return {object} 执行结果
 * */
function map(dataSource, itemAction) {
  if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  }
  const result = [];
  for (let index = 0; index < dataSource.length; index = index + 1) {
    result.push(itemAction && itemAction(dataSource[index], index));
  }
  return result;
}

export default map;