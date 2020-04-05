import { isNumber, isIndexed } from '../lang';
import { fail } from '../utils';

/**
 * 对数据进行一次索引行为，返回索引到的数据值
 * @param {object} dataSource 被索引目标数据
 * @param {number} index 索引值
 * @return {object} 执行结果
 * */
function nth(dataSource, index) {
  if (!isNumber(index)) {
    fail("Expected a number as the index");
  } else if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  } else if (index < 0 || index > dataSource.length - 1) {
    fail("Index value is out of bounds");
  }
  return dataSource[index];
}

export default nth;