import { reverse } from '../array';
import { default as flow } from './function.flow';

/**
 * 函数复合，从右到左执行函数列表，上一个函数的执行结果会作为下个函数的给定参数
 * @param funs 函数列表
 * @return 复合后的函数
 */
function compose(...funs){
  return flow(...reverse(funs));
}

export default compose;
