import { Maybe } from '../monad';
import { reduce } from '../collection';
import { exist } from '../lang';
import { fail } from '../utils';

/**
 * 根据属性路径取给定对象的属性值，该方法是安全的，不会抛出空指针异常。
 * 该函数是对 monad maybe 的特定封装
 * @param {string} path 属性路径
 * @param {object} target 给定对象
 * @return {*} result 取得的值
 */
function get(path, target){
  if(!exist(path)) fail('path is undefined');

  //　路径标量
  const pathScalar = (
    path
    .match(/(\[\w+\]|\.{1}\w+|\w+)/ig)
    .map(v => v.replace(/(\[|\]|\.)/g, ''))
  );

  // 迭代路径标量
  const maybe = reduce(
    pathScalar, 
    (sum, v) => sum.map(a => a[v]), 
    Maybe.of(target), 
    null,
  );

  return maybe.getOrElse();
}

export default get;