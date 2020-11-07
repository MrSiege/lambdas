import { last } from '../collection';
import { identity } from '../combinators';

/**
 * 注册一个通知函数
 * @param {function} func 通知函数
 * @param {object} results 效验结果集
 * @return {void}
 */
function notify(func, results){
  const result = last(results);
  if(result) func(result);
};

/**
 * 创建一个效验子函数
 * @param {string} message 效验消息
 * @param {function} func 效验函数
 * @return {function} 效验函数
 */
function test(message, validate){
  return function(value){
    return (
      validate(value)
      ? undefined
      : message
    )
  }
}

/**
 * 创建一个效验函数
 * @param {array} tests 效验子函数集
 * @return {function} 效验函数
 */
function validation(tests){
  const invoker = v => f => f(v);

  return function (value) {
    return (
      tests
      .map(invoker(value))
      .filter(identity)
    )
  }
}

validation.test = test;
validation.notify = notify;

export default validation;