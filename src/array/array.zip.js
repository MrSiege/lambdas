import { toArray } from '../lang';
import { best } from '../collection';
import { iterateUntil } from '../function';

/**
 * 接受一组数组，将他们通过索引组合起来
 * @param {array} args 数组
 * @return {array} 数组
 */
function zip(){
  const arrays = [...arguments];

  const longestArray = best(arrays, (x, y) => x.length > y.length);
  const length = longestArray.length;
  const result = iterateUntil((v, i) => i < length - 1, i => arrays.map(v => v[i]));
  return result.map(v => v.filter(x => x));
}

export default zip;