import { default as isArray } from './lang.isArray';
import { default as isString } from './lang.isString';

/**
 * 判断传递进来的参数是否是支持数字索引的
 * @param {object} data 参数
 * @return {boolean} 参数是否为 Array 类型
 * */
function isIndexed(data) {
  return isArray(data) || isString(data);
}

export default isIndexed;