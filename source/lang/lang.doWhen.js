import { default as truest } from './lang.truest';

/**
 * 根据第一个谓词参数执行第二个函数参数并返回结果
 * @param {object} condition 谓词参数
 * @param {function} action 函数参数
 * @return {object} 执行结果
 * */
function doWhen(condition, action) {
  if (truest(condition)) {
    return action && action();
  } else {
    return undefined;
  }
}

export default doWhen;