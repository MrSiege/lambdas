import { default as exist } from './lang.exist';

/**
 * 判断传递进来的参数是否是数字数据类型
 * @param {object} number 参数
 * @return {boolean} 参数是否为数字
 * */
function isNumber(number) {
  return exist(number) && typeof number === "number";
}

export default isNumber;