/**
 * 向控制台输出一段警告文字
 * @param {string} thing 警告描述
 * @return {void}
 * */
function warning(thing) {
  console.log(["WARNING:", thing].join(" "));
}

export default warning;