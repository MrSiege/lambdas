import { truest } from '../lang';

/**
 * 接收一个返回谓词的函数参数，返回一个根据参数数据返回 -1 | 0 | 1 格式的函数
 * @param {function} pred 返回谓词的函数参数
 * @return {function} 比较函数
 * */
function comparator(pred) {
  return function(x, y) {
    if (truest(pred && pred(x, y))) {
      return 1;
    } else if (truest(pred && pred(y, x))) {
      return -1;
    } else {
      return 0;
    }
  };
}

export default comparator;