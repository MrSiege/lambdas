/**
 * 返回列表的除第一个元素以外的其他元素
 * @param list 列表
 * @return 除第一个元素以外的其他元素
 */
function tail(list) {
  const result = [];

  for( let index = 1; index < list.length; index++ ) {
    result.push(list[index]);
  }

  return result;
}

export default tail;