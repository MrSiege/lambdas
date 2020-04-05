import { nth } from '../array';
import { isIndexed } from '../lang';

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的第一个元素
 * */
function find(dataSource, pred) {
  if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  }
  for (let index = 0; index < dataSource.length; index = index + 1) {
    const item = nth(dataSource, index);
    if (pred && pred(item)) {
      return item;
    }
  }
}

export default find;