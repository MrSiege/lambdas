/**
 * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
 * @param {object} dataSource 数据源参数
 * @param {function} itemAction 遍历行为
 * @return {void}
 * */
function each(dataSource, itemAction) {
  for (let index = 0; index < dataSource.length; index = index + 1) {
    itemAction && itemAction(dataSource[index], index);
  }
}

export default each;