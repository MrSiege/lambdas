/**
 * 接受个数组，过滤掉其中的重复值
 * @param {array} args 数组
 * @return {array} 包含唯一值的数组
 */
function uniq(source){
  const set = new Set();
  source.forEach(set.add.bind(set));

  return [...set.values()];
}

export default uniq;