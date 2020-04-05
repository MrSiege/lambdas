import { toArray } from '../lang';
import { reduce } from '../collection';

/**
 * 接收一组谓词函数，返回一个验证函数。返回的验证函数在给定对象上执行每个谓词，
 * 并对每一个返回 false 的谓词增加一个特殊的错误字符到一个数组中。
 * 如果所有的谓词返回 true, 那么最终返回的结果是一个空数组。否则，结果为错误消息的数组。
 * @return {function} 聚合了谓词函数的验证函数
 * */
function checker() {
  const validators = toArray(arguments);

  return function(targetValidationData) {
    const errors = [];

    return reduce(
      validators,
      function(errs, check) {
        if (check(targetValidationData)) {
          return errs;
        } else {
          errs.push(check.message);
          return errs;
        }
      },
      errors
    );
  };
}

export default checker;
