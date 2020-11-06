import * as utils from '../utils';

/**
 * 生成 uuid
 * @return {string} uuid
 * */
const uuid = (function(){
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  const radix = chars.length;  // 基数
  const pieces = [8, 4, 4, 4, 12]; // 标准 uuid 分片格式

  return () => {
    const randomChar = () => chars[0 | (Math.random() * radix)];
    const uuid = pieces.map(len => utils.times(randomChar, len));

    return uuid.map(v => v.join('')).join('-');
  }
})();

export default uuid;