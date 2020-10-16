import { iterateUntil } from '../function';

/**
 * 生成 uuid
 * @return {string} uuid
 * */
function uuid() {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  const radix = chars.length;  // 基数
  
  const pieces = [8, 4, 4, 4, 12]; // 标准 uuid 分片格式
  const randomChar = () => chars[0 | (Math.random() * radix)];
  const uuid = pieces.map(len => iterateUntil((v, i) => i < len - 1, randomChar));

  return uuid.map(v => v.join('')).join('-');
}

export default uuid;