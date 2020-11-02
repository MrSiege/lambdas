/**
 * 抛出一个异常
 * @param {string} thing 异常描述
 * @return {void}
 * */
function fail(thing) {
  throw new Error(thing);
}
export default fail;