import { isArray } from '../lang';

/**
 * 展平数组
 * @param {array} target 目标数组
 * @return 展平后的数组
 */
function flattenDeep(list) {
  return (
    list
    .map(v => isArray(v) ? flattenDeep(v) : [v])
    .reduce((sum, v) => sum.concat(v))
  );
}

export default flattenDeep;