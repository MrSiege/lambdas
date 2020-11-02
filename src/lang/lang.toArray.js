import { default as isObject } from './lang.isObject';
import { values } from '../object';

/**
 * 接收一个源数据，将其转换为数组返回
 * @param {object} dataSource 源数据
 * @return {array} 转换后的结果
 * */
function toArray(dataSource) {
  if(isObject(dataSource)){
    return values(dataSource);
  }
  
  return [...dataSource];
}

export default toArray;