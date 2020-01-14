/**
 * 往 html 文档中写一行内容
 * @return {void}
 * */
function documentWriteln() {
  document.writeln(...arguments, "<br/>");
}

/**
 * 往 html 文档中写入内容
 * @return {void}
 * */
function documentWrite() {
  document.writeln(...arguments);
}

/**
 * 抛出一个异常
 * @param {string} thing 异常描述
 * @return {void}
 * */
function fail(thing) {
  throw new Error(thing);
}

/**
 * 向控制台输出一段警告文字
 * @param {string} thing 警告描述
 * @return {void}
 * */
function warning(thing) {
  console.log(["WARNING:", thing].join(" "));
}

/**
 * 向控制台输出一段提示文字
 * @param {string} thing 提示文字描述
 * @return {void}
 * */
function note() {
  console.log(["NOTE:", ...arguments].join(" "));
}

module.exports = {
  note,
  fail,
  warning,
  documentWrite,
  documentWriteln,
};