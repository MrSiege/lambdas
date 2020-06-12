import { default as keys } from './object.keys';
import { default as values } from './object.values';
import { zip } from '../array';

/**
 * 获取一个对象的所有键
 * @param {object} obj 目标对象
 * @return {array} 对象所有键值对的数组
 * */
function toPairs(obj) {
  return zip(
    keys(obj),
    values(obj),
  ).filter(v => v.length > 0);
}

export default toPairs;