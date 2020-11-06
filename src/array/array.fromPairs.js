import { tap } from '../combinators';
/**
 * 转换键值对数组为对象
 * @param target 键值对数组
 * @return 对象
 */
function fromPairs(source) {
  const mixin = O => ([k, v]) => O[k] = v;
  return tap(O => source.forEach(mixin(O)), {});
}

export default fromPairs;