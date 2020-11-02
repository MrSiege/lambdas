/**
 * OR 组合子
 * 接受两个函数 f, g 和一个参数 a 
 * 将函数 f 应用与参数 a，如已求得值则返回结果
 * 否则将函数 g 应用与参数 a，并返回结果
 * OR :: (a -> *) -> ( a -> *) -> a -> *
 */
function alt(f, g){
  return a => {
    const result = f(a);
    if(result !== null && result !== undefined && result !== false){
      return result;
    } else {
      return g(a);
    }
  };
}

export default alt;