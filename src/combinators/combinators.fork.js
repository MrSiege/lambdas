/**
 * fork(join) 组合子
 * 接收三个函数 join f1 f2 和一个参数 a
 * 将函数 f1 和　f2 应用与参数 a
 * 将函数 join 应用于 f1 f2 函数的结果
 * fork :: (a b -> *) -> (a -> *) -> (a -> *) -> a -> *
 */
function fork(join, f1, f2){
  return a => join(f1(a), f2(a));
}

export default fork;