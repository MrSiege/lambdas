/**
 * 通过iteration 映射集合 source
 * @param {array} source 数据源参数
 * @param {function} iteration 迭代
 * @return {array} 结果
 * */
function map(source, iteration) {
  const result = [];

  for (let i = 0; i < source.length; i++) {
    result.push(iteration(source[i], i));
  }

  return result;
}

export default map;