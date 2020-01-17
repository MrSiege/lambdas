const { toArray, isNumber, isIndexed, isFunction } = require('./lang');
const { best } = require('./collection');
const { fail } = require('./utils');
const { Stack } = require('./data-structure');
const { each } = require('./array.each');
const { iterateUntil } = require('./function');

/**
 * 对数据进行一次索引行为，返回索引到的数据值
 * @param {object} dataSource 被索引目标数据
 * @param {number} index 索引值
 * @return {object} 执行结果
 * */
function nth(dataSource, index) {
  if (!isNumber(index)) {
    fail("Expected a number as the index");
  } else if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  } else if (index < 0 || index > dataSource.length - 1) {
    fail("Index value is out of bounds");
  }
  return dataSource[index];
}

/**
 * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
 * @param {object} dataSource 数据源参数
 * @param {function} itemAction 遍历行为
 * @return {object} 执行结果
 * */
function map(dataSource, itemAction) {
  if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  }
  const result = [];
  for (let index = 0; index < dataSource.length; index = index + 1) {
    result.push(itemAction && itemAction(dataSource[index], index));
  }
  return result;
}

/**
 * 接收一个元素和一个数组，将元素拼接到数组的前方后返回
 * @param {object} elem 元素
 * @param {array} arr 数组
 * @return {array} 拼接后返回的元素
 * */
function construct(elem, arr) {
  return [elem].concat(arr);
}

/**
 * 接收一个数据源参数与函数，返回按照排序函数指定数据进行排序的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function sortBy(dataSource, pickup) {
  if (!isFunction(pickup)) {
    fail("Expects data of a function type as a parameter");
  }
  if (!isIndexed(dataSource)) {
    fail("Not supported on non-indexed type");
  }
  //模拟系统的堆栈帧
  const stack = new Stack({ size: Infinity });
  //源数据镜像，这里复制一个镜像是为了不影响到源数据数组的结构
  const dataSourceMirroring = [];
  each(dataSource, function(item, index) {
    dataSourceMirroring[index] = item;
  });
  let keyIndex, key, temp;
  // 该函数用来完成一帧的排序
  const sort = function sort({ i, j }) {
    const originalI = i,
      originalJ = j;
    // init parameter
    keyIndex = i;
    key = dataSourceMirroring[i];
    while (i !== j) {
      //寻找小于关键值的数据
      while (pickup(dataSourceMirroring[j]) >= pickup(key) && i < j) {
        j = j - 1;
      }
      //寻找大于关键值的数据
      while (pickup(dataSourceMirroring[i]) <= pickup(key) && i < j) {
        i = i + 1;
      }
      if (i !== j) {
        //交换索引 i 与索引 j 的值
        temp = dataSourceMirroring[i];
        dataSourceMirroring[i] = dataSourceMirroring[j];
        dataSourceMirroring[j] = temp;
      }
    }
    //交换关键值到正确位置
    temp = dataSourceMirroring[j];
    dataSourceMirroring[j] = key;
    dataSourceMirroring[keyIndex] = temp;
    return { i: originalI, j: originalJ, partitionIndex: j }; //返回关键数据位置
  };
  //保存当前堆栈帧
  stack.push({ i: 0, j: dataSourceMirroring.length - 1 });
  //开始模拟系统堆栈帧进行迭代
  while (!stack.isEmpty()) {
    // 判断是否是空栈，若不是空栈，则弹出栈顶进行一次划分
    const endpointIndex = stack.pop();
    const result = sort(endpointIndex);
    // 将未处理完成的子序列入栈，长度为 1 的子序列不需要压入堆栈
    if (result.partitionIndex - result.i > 1) {
      stack.push({ i: result.i, j: result.partitionIndex - 1 });
    }
    if (result.j - result.partitionIndex > 1) {
      stack.push({ i: result.partitionIndex + 1, j: result.j });
    }
  }
  return dataSourceMirroring;
}

/**
 * 接受一组数组，将他们通过索引组合起来
 * @param {array} args 数组
 * @return {array} 数组
 */
function zip(){
  const arrays = toArray(arguments);
  const longestArray = best(arrays, (x, y) => x.length > y.length);
  const length = longestArray.length;
  const result = iterateUntil((v, i) => i < length - 1, i => arrays.map(v => v[i]));
  
  return result.map(v => v.filter(x => x));
}

/**
 * zip 的逆版本
 * @param {array} args 数组
 * @return {array} 数组
 */
function unzip(args){
  if(!args.length){
    return [];
  }
  const length = args[0].length;
  const result = iterateUntil((v, i) => i < length - 1, () => []);

  args.map(
    (v, i) => v.map(
      (vx, ix) => result[ix].push(vx)
    )
  );

  return result;
}

module.exports = { nth, each, map, sortBy, construct, zip, unzip };