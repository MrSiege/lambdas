import { head, tail, reduce } from '../collection';

/**
 * 函数流，从左到右执行函数列表，上一个函数的执行结果会作为下个函数的给定参数
 * @see compose
 * @param funs 函数列表
 * @return 复合后的函数
 */
function flow(...funs){
  if(funs.length === 0) return (...args) => args;

  return (...args) => {
    const first = head(funs);
    return reduce(tail(funs), (result, fun) => fun(result),  first(...args), null);
  }
}

export default flow;