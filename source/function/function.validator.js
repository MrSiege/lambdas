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

export default validator;