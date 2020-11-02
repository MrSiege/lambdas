/**
 * 接收一个前馈函数与值的生成函数，当生成的值符合前馈函数的条件时，停止执行当前函数
 * @param {function} feedForward 前馈函数
 * @param {function} init 值的初始化函数
 * */
function iterateUntil(feedForward, init) {
  const result = [];
  let index = 0;
  do {
    result.push(init(index));
  } while (feedForward(result[result.length], index++));
  return result;
}

export default iterateUntil;