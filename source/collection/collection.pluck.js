import { exist } from '../lang';

/**
 * 获取一个对象数组指定键的值
 * @param {array} objects 对象数组
 * @param {string} targetKey 目标键
 * @return {array} 值的数组
 * */
function pluck(objects, targetKey) {
  const values = [];
  for (let index = 0; index < objects.length; index = index + 1) {
    const item = objects[index];
    const value = item[targetKey];
    if (exist(value)) {
      values.push(value);
    }
  }
  return values;
}

export default pluck;