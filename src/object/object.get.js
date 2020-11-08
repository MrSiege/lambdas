import { Maybe } from '../monad';
import { reduce } from '../collection';

/**
 * 根据属性路径取给定对象的属性值，该方法是安全的，不会抛出空指针异常。
 * 该函数是对 monad maybe 的特定封装
 * @param {string} path 属性路径
 * @param {object} target 给定对象
 * @return {*} result 取得的值
 */
function get(path, target){
  const trimRegExp = /(\[|\]|\.)/g;
  const pathRegExp = /(\[\w+\]|\.{1}\w+|\w+)/ig;

  const scalars = (
    Maybe
    .of(path)
    .map(v => v.match(pathRegExp))
    .map(v => v.map(s => s.replace(trimRegExp, '')))
    .getOrElse([])
  );

  return reduce(
    scalars,
    (O, P) => O.map(V => V[P]), 
    Maybe.of(target),
  ).getOrElse();
}

export default get;