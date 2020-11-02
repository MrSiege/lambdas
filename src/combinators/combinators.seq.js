/**
 * S 组合子
 * 接受一个函数序列 fs 和一个参数 a
 * 将函数序列中的每一个函数 f 应用与参数 a
 * seq :: fs -> a -> *
 */
function seq(){
  const fs = [...arguments];
  return a => fs.forEach(f => f(a));
}

export default seq;