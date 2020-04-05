/**
 * 函数组合子K. (返回一个常量的函数)
 * @param {object} value 定义需要返回的常量
 * @return {object} 常量的值
 * */
function always(value) {
  return function() {
    return value;
  };
}

export default always;