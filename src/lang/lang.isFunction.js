import { default as exist } from './lang.exist';

/**
 * 判断传递进来的参数是否为 function 类型
 * @param {function} func 函数参数
 * @return {boolean} 参数是否为函数类型的数据
 * */
function isFunction(func) {
  return exist(func) && typeof func === "function";
}

export default isFunction;