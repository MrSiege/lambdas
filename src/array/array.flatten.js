import { isArray } from '../lang';
import { identity } from '../combinators';

/**
 * 展平数组
 * @param {array} source 源
 * @return {array} 展平后的数组
 */

function flatten(source) {
  return (
    source
    .map(v => isArray(v) ? v : [v])
    .reduce((sum, v) => sum.concat(v), [])
    .filter(identity)
  );
}

export default flatten;