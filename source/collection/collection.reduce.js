import { each } from '../array';
import { exist, clonedeep } from '../lang';

/**
 * 将一个数据源迭代归结为一个单一的值
 * @param {object} data 数据源
 * @param {function} iterator 迭代函数
 * @param {object} memo 传递给迭代函数的初始值
 * @param {object} context 上下文绑定
 * */
function reduce(data, iterator, memo, context) {
  let iterativeValue = memo;
  const dataSource = clonedeep(data);

  if (exist(iterativeValue) === false) {
    iterativeValue = dataSource[0];
    dataSource.splice({ startIndex: 0 }.startIndex, { delLen: 1 }.delLen);
  }
  
  each(dataSource, function(data, index) {
    iterativeValue = iterator.call(
      context,
      iterativeValue,
      data,
      index,
      dataSource
    );
  });

  return iterativeValue;
}

export default reduce;