const { truest, toArray, exist } = require('./lang');
const { map } = require('./array');
const { reduce } = require('./collection');

/**
 * 接收一个返回谓词的函数参数，返回一个根据参数数据返回 -1 | 0 | 1 格式的函数
 * @param {function} pred 返回谓词的函数参数
 * @return {function} 比较函数
 * */
function comparator(pred) {
  return function(x, y) {
    if (truest(pred && pred(x, y))) {
      return 1;
    } else if (truest(pred && pred(y, x))) {
      return -1;
    } else {
      return 0;
    }
  };
}

/**
 * 返回一个常量的函数
 * TODO: 函数组合子K.
 * @param {object} value 定义需要返回的常量
 * @return {object} 常量的值
 * */
function always(value) {
  return function() {
    return value;
  };
}

/**
 * 接收一个前馈函数与值的生成函数，当生成的值符合前馈函数的条件时，停止执行当前函数
 * @param {function} feedForward 前馈函数
 * @param {function} init 值的初始化函数
 * */
function iterateUntil(feedForward, init) {
  const result = [];
  let index = 0;
  do {
    result.push(init(index));
  } while (feedForward(result[result.length], index++));
  return result;
}

/**
 * 接收一个函数及一些额外的参数，并返回一个只是调用给定的原始函数的函数
 * @param {function} fun 原始函数
 * @return {function}
 * */
function fnull(fun) {
  // 取得除 fun 之外的其他参数
  const [, ...defaults] = arguments;
  return function() {
    let index = 0;
    const args = map(toArray(arguments), e =>
      exist(e) ? e : defaults[index++]
    );
    return fun.apply(undefined, args);
  };
}

/**
 * 创建一个验证器
 * @param {string} message 验证失败后的错误消息
 * @param {function} fun 一套验证规则
 * @return {function} 验证器函数
 * */
function validator(message, fun) {
  const f = function() {
    return fun.apply(fun, arguments);
  };
  
  f["message"] = message;
  return f;
}

/**
 * 接收一组谓词函数，返回一个验证函数。返回的验证函数在给定对象上执行每个谓词，
 * 并对每一个返回 false 的谓词增加一个特殊的错误字符到一个数组中。
 * 如果所有的谓词返回 true, 那么最终返回的结果是一个空数组。否则，结果为错误消息的数组。
 * @return {function} 聚合了谓词函数的验证函数
 * */
function checker() {
  const validators = toArray(arguments);
  return function(targetValidationData) {
    const errors = [];
    return reduce(
      validators,
      function(errs, check) {
        if (check(targetValidationData)) {
          return errs;
        } else {
          errs.push(check.message);
          return errs;
        }
      },
      errors
    );
  };
}

/**
 * 创建一个函数代理
 * @param {function} targetFunc 被代理函数
 * @param {function} proxyFunc 代理函数
 * @param {function} context 上下文
 * @return {function} 经过包装的代理函数
 */
function proxy(targetFunc, proxyFunc, context) {
  return function (params) {
    return proxyFunc.aplly(context, targetFunc)
  };
}

module.exports = {
  fnull,
  checker,
  always,
  comparator,
  iterateUntil,
  validator,
}