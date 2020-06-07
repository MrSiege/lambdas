/**
 * 柯里化一个函数
 * @param {function} f 给定函数
 * @param {number} a 柯里化的参数数量
 * @return {function} 柯里化后的函数 f
 * */
function curry(f, a) {
  const params = [];

  const tunk = (...args) => {
    args.map(v => params.push(v));
    if(params.length >= a)
      return f(...params);
    return tunk;
  }

  return tunk;
}

export default curry;