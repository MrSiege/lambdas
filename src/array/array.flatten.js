import { isArray } from '../lang';

/**
 * 展平数组
 * @param {array} target 目标数组
 * @return 展平后的数组
 */

function flatten(list) {
  return (
    list
    .map(v => isArray(v) ? v : [v])
    .reduce((sum, v) => sum.concat(v))
  );
}

export default flatten;