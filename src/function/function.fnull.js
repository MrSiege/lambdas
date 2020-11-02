import { toArray, exist } from '../lang';
import { map } from '../array';

/**
 * 接收一个函数及一些额外的参数，并返回一个只是调用给定的原始函数的函数
 * @param {function} fun 原始函数
 * @return {function}
 * */
function fnull(fun) {
  // 取得除 fun 之外的其他参数
  const [, ...defaults] = arguments;
  return function() {
    let index = 0;
    const args = map(toArray(arguments), e =>
      exist(e) ? e : defaults[index++]
    );
    return fun.apply(undefined, args);
  };
}

export default fnull;