/**
 * 判断传递进来的参数是否存在（存在有效值）
 * @param {object} x 参数
 * @return {boolean} 参数是否存在有效值
 * */
function exist(x) {
  //在松散不等式的情况下，undefined = null
  return x != null;
}

export default exist;