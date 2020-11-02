import { default as exist } from './lang.exist';

/**
 * 判断传递进来的参数是否为 object 类型
 * @param {object} object 参数
 * @return {boolean} 参数是否为对象类型的数据
 * */
function isObject(obj) {
  return exist(obj) && Object.prototype.toString.call(obj) === '[object Object]';
}

export default isObject;