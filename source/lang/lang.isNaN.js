/**
 * 判断传递进来的参数是否是 NaN 类型
 * @param {number} number 参数
 * @return {boolean} 参数是否为 NaN 类型
 * */
function isNaN(number) {
  return Number.isNaN(number);
}

export default isNaN;