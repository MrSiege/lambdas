/**
 * 接受一个方法，如果给定对象存在该方法则调用它
 * @param name 方法名
 * @param method 函数
 * @return invoker 函数
 */
function invoker(name, method) {
  return (target, ...args) => {
    const targetMethod = target[name]

    if(targetMethod && method === targetMethod) {
      return targetMethod.apply(target, args);
    }
  }
}

export default invoker;