/**
 * 获取一个对象的所有键
 * @param {object} object 目标对象
 * @return {array} 对象所有键的数组
 * */
function keys(object) {
  const keys = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

export default keys;