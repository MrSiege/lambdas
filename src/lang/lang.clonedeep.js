import { default as isObject } from './lang.isObject';
import { default as isArray } from './lang.isArray';

/**
 * 深度复制一个源对象到目标对象
 * @author Daniel William
 * @param {object} sourceObject 源对象
 * @return {object} 新对象
 * 在使用递归算法时应尽量避免深层递归，递归过深会耗尽系统栈的内存，造成栈溢出。
 * */
function clonedeep(sourceObject) {
  let value = null;

  if(isObject(sourceObject)){
    return Object.assign({}, sourceObject);
  } else if (isArray(sourceObject)) {
    value = sourceObject.slice().map(clonedeep);
  } else {
    value = sourceObject;
  }

  return value;
}

export default clonedeep;