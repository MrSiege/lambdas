/**
 * 向控制台输出一段提示文字
 * @param {string} thing 提示文字描述
 * @return {void}
 * */
function note() {
  console.log(["NOTE:", ...arguments].join(" "));
}

export default note;