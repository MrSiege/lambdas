/* eslint-disable curly */
import { isArray } from '../lang';

/**
 * 创建一个效验函数
 * @param {array} tests 效验子函数集
 * @return {function} 效验函数
 */
function validation(tests){
  return value => {
    const messages = tests.map(v => v(value) ? '' : v.message).filter(v => v);

    return {
      messages,
      result: messages.length === 0,
    };
  }
}

/**
 * 创建一个效验子函数
 * @param {string} message 效验消息
 * @param {function} func 效验函数
 * @return {function} 效验函数
 */
validation.test = function test(message, func){
  func.message = message;
  return func;
};

/**
 * 注册一个通知函数
 * @param {function} func 通知函数
 * @param {object} validationResults 效验结果集
 * @return {function} 效验函数
 */
validation.notify = function notify(func, validationResults){
  if(!isArray(validationResults) && !validationResults.result) {
    func(validationResults.messages[0]);
    return validation;
  } else {
    const results = validationResults.filter(v => !v.result);
    if(results.length) func(results[0].messages[0]);
    return validation;
  }
};

export default validation;