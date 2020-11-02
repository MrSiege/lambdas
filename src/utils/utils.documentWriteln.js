/**
 * 往 html 文档中写一行内容
 * @return {void}
 * */
function documentWriteln() {
  document && document.writeln(...arguments, "<br/>");
}

export default documentWriteln;