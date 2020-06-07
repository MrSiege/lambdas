/**
 * 往 html 文档中写入内容
 * @return {void}
 * */
function documentWrite() {
  document && document.writeln(...arguments);
}

export default documentWrite;