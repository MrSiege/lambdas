import { Maybe } from '../monad';
import { tap } from '../combinators';
import { reduce, last } from '../collection';

/**
 * 根据属性路径设定给定对象的属性值，该方法是安全的，不会抛出空指针异常。
 * @param {string} path 属性路径
 * @param {*} 　　　value 属性值
 * @param {object} target 给定对象
 * @return {object} 给定对象
 */
function set(path, value, target){
  const trimRegExp = /(\[|\]|\.)/g;
  const pathRegExp = /(\[\w+\]|\.{1}\w+|\w+)/ig;

  const scalars = (
    Maybe
    .of(path)
    .map(v => v.match(pathRegExp))
    .map(v => v.map(s => s.replace(trimRegExp, '')))
    .getOrElse([])
  );

  reduce(
    tap(v => v.pop(), scalars.slice()),
    (O, P) => O[P] ? O[P] : tap(v => O[P] = v, {}), 
    target,
  )[last(scalars)] = value;

  return target;
}

export default set;