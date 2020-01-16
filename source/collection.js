const { each } = require('./array.each');
const { nth } = require('./array');
const { toArray, isNumber, isIndexed, isFunction, isArray, exist, duplicate } = require('./lang');

/**
 * 接收一个集合参数与一个谓词，当对于集合中所有的元素谓词函数都返回 true 时，
 * 返回 true，否则返回 false
 * @param {object} dataSource 数据源
 * @param {function} pred 谓词函数
 * @return {boolean} 运算结果
 * */
function allOf(dataSource, pred) {
  let result = true; 
  const array = toArray(dataSource);
  for (let index = 0; index < array.length; index = index + 1) {
    const item = nth(array, index);
    result = pred(item) && result;
  }
  return result;
}

/**
 * 接收一个集合参数与一个谓词，当对于集合中有一个元素谓词函数返回 true 时，返回 true，否则返回 false
 * @param {object} dataSource 数据源
 * @param {function} pred 谓词函数
 * @return {boolean} 运算结果
 * */
function anyOf(dataSource, pred) {
  let result = false;
  const array = toArray(dataSource);
  for (let index = 0; index < array.length; index = index + 1) {
    const item = nth(array, index);
    result = pred(item) || result;
  }
  return result;
}

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的所有元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的第一个元素
 * */
function filter(dataSource, pred) {
  const result = [];
  each(dataSource, function(item) {
    if (pred(item)) {
      result.push(item);
    }
  });
  return result;
}

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的第一个元素
 * */
function find(dataSource, pred) {
  if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  }
  for (let index = 0; index < dataSource.length; index = index + 1) {
    const item = nth(dataSource, index);
    if (pred && pred(item)) {
      return item;
    }
  }
}

/**
 * 接收一个返回谓词的函数参数，返回一个反转谓词参数执行结果的参数(补集)
 * @param {function} pred 返回谓词的函数参数
 * @return {function} Inversion results function
 * */
function complement(pred) {
  return function() {
    return !pred.apply(undefined, toArray(arguments));
  };
}

/**
 * 接收一个数据源参数与函数，返回按照数据拾取函数返回数据进行分组的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function groupBy(dataSource, pickup) {
  const groupMap = new Map(),
  dataSourceMirroring = [];
  each(dataSource, function(item, index) {
    const groupKey = pickup(item);
    const result = groupMap.get(groupKey);
    if (result === undefined) {
      groupMap.set(groupKey, [item]);
    } else {
      result.push(item);
    }
  });
  groupMap.forEach(function(value, key, map) {
    const object = {};
    object[key] = value;
    dataSourceMirroring.push(object);
  });
  return dataSourceMirroring;
}

/**
 * 接收一个数据源参数与函数，返回按照的数据拾取函数返回数据进行统计数量的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function countBy(dataSource, pickup) {
  const groupMap = new Map();
  each(dataSource, function(item, index) {
    const countKey = pickup(item);
    const result = groupMap.get(countKey);
    if (result === undefined) {
      groupMap.set(countKey, 1);
    } else {
      groupMap.set(countKey, result + 1);
    }
  });
  const countInfo = {};
  groupMap.forEach(function(value, key, map) {
    countInfo[key] = value;
  });
  return countInfo;
}

/**
 * 获取一个对象数组指定键的值
 * @param {array} objects 对象数组
 * @param {string} targetKey 目标键
 * @return {array} 值的数组
 * */
function pluck(objects, targetKey) {
  const values = [];
  for (let index = 0; index < objects.length; index = index + 1) {
    const item = objects[index];
    const value = item[targetKey];
    if (exist(value)) {
      values.push(value);
    }
  }
  return values;
}

/**
 * 将一个数据源迭代归结为一个单一的值
 * @param {object} data 数据源
 * @param {function} iterator 迭代函数
 * @param {object} memo 传递给迭代函数的初始值
 * @param {object} context 上下文绑定
 * */
function reduce(data, iterator, memo, context) {
  let iterativeValue = memo;
  const dataSource = duplicate(data);
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

/**
 * 接收一个最佳值的比较规则函数与一个数据源, 返回数据源中的最佳值
 * @return {object} 数据源中的最佳值
 * */
function best(dataSource, fun) { 
  return reduce(dataSource, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

module.exports = {
  allOf,
  anyOf,
  filter,
  find,
  complement,
  groupBy,
  countBy,
  pluck,
  best,
  reduce
};
