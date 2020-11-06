import { default as keys } from './object.keys';
import { default as values } from './object.values';
import { zip } from '../array';

/**
 * 获取一个对象的所有键
 * @param {object} source 源
 * @return {array} 对象所有键值对的数组
 * */
function toPairs(source) {
  return zip([
    keys(source), 
    values(source),
  ]).filter(v => v.length);
}

export default toPairs;