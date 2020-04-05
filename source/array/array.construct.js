/**
 * 接收一个元素和一个数组，将元素拼接到数组的前方后返回
 * @param {object} elem 元素
 * @param {array} arr 数组
 * @return {array} 拼接后返回的元素
 * */
function construct(elem, arr) {
  return [elem].concat(arr);
}

export default construct;