import { toArray } from '../lang';

/**
 * 接收一个返回谓词的函数参数，返回一个反转谓词参数执行结果的参数(补集)
 * @param {function} pred 返回谓词的函数参数
 * @return {function} Inversion results function
 * */
function complement(pred) {
  return function() {
    return !pred.apply(undefined, toArray(arguments));
  };
}

export default complement;