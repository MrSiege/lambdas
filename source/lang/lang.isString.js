import { default as exist } from './lang.exist';

/**
 * 判断传递进来的参数是否是字符串数据类型
 * @param {object} string 参数
 * @return {boolean} 参数是否为字符串
 * */
function isString(string) {
  return exist(string) && typeof string === "string";
}

export default isString;