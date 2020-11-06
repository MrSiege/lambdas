import { times } from '../utils';

/**
 * 接受一组数组，将他们通过索引组合起来
 * @param {array} source 源
 * @return {array} 结果
 */
function zip(source){
  /*
   *       x
   * R1 = [1, 2, 3, 4, 5, 6, 7, 8, 9] y
   * R2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * R3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * R4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * R5 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * R6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   * source = [R1, R2, R3, R4, R5, R6]
   *
   * ↕ mutual mapping from function zip
   *
   *       x
   * R1 = [1, 1, 1, 1, 1, 1] y
   * R2 = [2, 2, 2, 2, 2, 2]
   * R3 = [3, 3, 3, 3, 3, 3]
   * R4 = [4, 4, 4, 4, 4, 4]
   * R5 = [5, 5, 5, 5, 5, 5]
   * R6 = [6, 6, 6, 6, 6, 6]
   * R7 = [7, 7, 7, 7, 7, 7]
   * R8 = [8, 8, 8, 8, 8, 8]
   * R9 = [9, 9, 9, 9, 9, 9]
   * source = [R1, R2, R3, R4, R5, R6, R7, R8, R9]
   */
  return times(
    x => times(y => source[y][x], source.length),
    source.reduce((lg, v) => lg > v.length ? lg : v.length, 0),
  );
}

export default zip;