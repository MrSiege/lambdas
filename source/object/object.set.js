import { Maybe } from '../monad';
import { reduce } from '../collection';
import { tap } from '../combinators';
import { exist } from '../lang';
import { fail } from '../utils';

/**
 * 根据属性路径设定给定对象的属性值，该方法是安全的，不会抛出空指针异常。
 * 该函数是对 monad maybe 的特定封装
 * @param {string} path 属性路径
 * @param {*} 　　　value 属性值
 * @param {object} target 给定对象
 * @return {void}
 */
function set(path, value, target){
  if(!exist(path)) fail('path is undefined');

  //　路径标量
  const pathScalars = (
    path
    .match(/(\[\w+\]|\.{1}\w+|\w+)/ig)
    .map(v => v.replace(/(\[|\]|\.)/g, ''))
  );
  
  const absolutePathScalar = pathScalars.slice().pop();
  const prefixPathScalars = tap(v => v.pop(), pathScalars.slice());

  // 迭代前缀路径标量
  const maybe = reduce(
    prefixPathScalars,
    (sum, v) => sum.map(a => a[v]),
    Maybe.of(target), 
    null,
  );

  maybe.map(v => v[absolutePathScalar] = value);
}

export default set;