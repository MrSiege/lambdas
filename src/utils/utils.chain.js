/**
 * 重复一个函数若干次，并收集其结果返回
 * @return {string} uuid
 * */
function times(func, count) {
  const result = [];

  for(let i = 0; i < count; i++){
    result.push(func(i));
  }

  return result;
}

export default times;