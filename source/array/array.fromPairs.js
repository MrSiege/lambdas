/**
 * 转换键值对数组为对象
 * @param target 键值对数组
 * @return 对象
 */

function fromPairs(list) {
  const result = {};
  list.map(([k, v]) => result[k] = v);
  return result;
}

export default fromPairs;