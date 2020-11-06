import { zip } from '../array';

/**
 * zip 的逆版本
 * @see zip
 * @param {array} source 源
 * @return {array} 结果
 */
function unzip(source){
  return zip(source);
}

export default unzip;