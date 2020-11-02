/**
 * 判断数据类型是否是 date 类型
 * @param target
 * @return 是否是 date 类型
 */
function isDate(target) {
  return Object.prototype.toString.call(target) === '[object Date]'
}

export default isDate;