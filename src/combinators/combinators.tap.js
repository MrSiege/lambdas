/**
 * K 组合子
 * 接受一个函数 f 和一个参数 a 
 * 1. 将函数 f 应用与参数 a 
 * 2. 返回参数 a
 * tap :: (a -> *) -> a -> a
 */
function tap(f, a){
  f(a);
  return a;
}

export default tap;