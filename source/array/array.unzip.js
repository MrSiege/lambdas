import { iterateUntil } from '../function';

/**
 * zip 的逆版本
 * @param {array} args 数组
 * @return {array} 数组
 */
function unzip(args){
  if(!args.length){
    return [];
  }
  const length = args[0].length;
  const result = iterateUntil((v, i) => i < length - 1, () => []);

  args.map(
    (v, i) => v.map(
      (vx, ix) => result[ix].push(vx)
    )
  );

  return result;
}

export default unzip;