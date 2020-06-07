import { nth } from '../array';
import { toArray } from '../lang';


/**
 * 接收一个集合参数与一个谓词，当对于集合中有一个元素谓词函数返回 true 时，返回 true，否则返回 false
 * @param {object} dataSource 数据源
 * @param {function} pred 谓词函数
 * @return {boolean} 运算结果
 * */
function anyof(dataSource, pred) {
  let result = false;
  const array = toArray(dataSource);
  for (let index = 0; index < array.length; index = index + 1) {
    const item = nth(array, index);
    result = pred(item) || result;
  }
  return result;
}

export default anyof;