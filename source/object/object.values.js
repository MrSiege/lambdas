/**
 * 获取一个对象的所有值
 * @param {object} object 目标对象
 * @return {array} 对象所有键的数组
 * */
function values(object) {
  const values = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      values.push(object[key]);
    }
  }
  return values;
}

export default values;