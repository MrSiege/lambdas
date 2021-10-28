import { isIndexed, isFunction } from '../lang';
import { fail } from '../utils';
import { Stack } from '../struct';
import { identity } from '../combinators';
import { default as each } from './array.each';

/**
 * 接收一个数据源参数与函数，返回按照排序函数指定数据进行排序的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
function sortBy(dataSource, pickup = identity) {
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

export default sortBy;