import { default as exist } from './lang.exist';

/**
 * 判断传递进来的参数是否为 true 的同义词
 * @param {object} x 参数
 * @return {boolean} 参数是否为 true 的同义词
 * */
function truest(x) {
  return x !== false && exist(x);
}

export default truest;