import { default as reduce } from './collection.reduce';

/**
 * 接收一个最佳值的比较规则函数与一个数据源, 返回数据源中的最佳值
 * @return {object} 数据源中的最佳值
 * */
function best(dataSource, fun) { 
  return reduce(dataSource, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

export default best;