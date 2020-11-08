/**
 * 接收数据源与迭代函数，依次将迭代函数作用于数据源的每一项
 * @param {object} source 数据源
 * @param {function} iteration 迭代
 * @return {void}
 * */
function each(source, iteration) {
  for (let i = 0; i < source.length; i++) {
    iteration(source[i], i, source);
  }
}

export default each;