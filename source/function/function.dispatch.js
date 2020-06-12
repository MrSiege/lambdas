import { exist } from '../lang';

/**
 * 创建一个多态函数，将函数列表映射到给定对象，并返回第一个存在的值
 * 1. 确保目标的存在
 * 2. 检查是否有原生版本，如果有则使用它
 * 3. 如果没有，则做一些实现这些行为的具体任务
 *   · 做特定类型的任务（如果适用）
 *   · 做特定参数的任务（如果适用）
 *   · 做特定个参数的任务（如果适用）
 * @param funcs 函数列表
 * @return 多态函数
 */
function dispatch(...funs){
  let result;

  return (...args) => {
    for (let index = 0; index < funs.length; index++) {
      const fun = funs[index]
      result = fun.apply(fun, args)

      // TODO: 这里除了 undefined 和 null，其他值都算函数计算出了结果
      if (exist(result)) return result
    }
  }
}

export default dispatch;