/**
 * 接收一个源数据，将其转换为数组返回
 * @param {object} dataSource 源数据
 * @return {array} 转换后的结果
 * */
function toArray(dataSource) {
  return [...dataSource];
}

/**
 * 判断传递进来的参数是否是字符串数据类型
 * @param {object} string 参数
 * @return {boolean} 参数是否为字符串
 * */
function isString(string) {
  return exist(string) && typeof string === "string";
}

/**
 * 判断传递进来的参数是否是数字数据类型
 * @param {object} number 参数
 * @return {boolean} 参数是否为数字
 * */
function isNumber(number) {
  return exist(number) && typeof number === "number";
}

/**
 * 判断传递进来的参数是否是 NaN 类型
 * @param {number} number 参数
 * @return {boolean} 参数是否为 NaN 类型
 * */
function isNaN(number) {
  return Number.isNaN(number);
}

/**
 * 判断传递进来的参数是否是 Array 类型
 * @param {object} array 参数
 * @return {boolean} 参数是否为 Array 类型
 * */
function isArray(array) {
  return Array.isArray(array);
}

/**
 * 判断传递进来的参数是否为 function 类型
 * @param {function} func 函数参数
 * @return {boolean} 参数是否为函数类型的数据
 * */
function isFunction(func) {
  return exist(func) && typeof func === "function";
}

/**
 * 判断传递进来的参数是否是支持数字索引的
 * @param {object} data 参数
 * @return {boolean} 参数是否为 Array 类型
 * */
function isIndexed(data) {
  return isArray(data) || isString(data);
}

/**
 * 判断传递进来的参数是否存在（存在有效值）
 * @param {object} x 参数
 * @return {boolean} 参数是否存在有效值
 * */
function exist(x) {
  //在松散不等式的情况下，undefined = null
  return x != null;
}

/**
 * 判断传递进来的参数是否为 true 的同义词
 * @param {object} x 参数
 * @return {boolean} 参数是否为 true 的同义词
 * */
function truest(x) {
  return x !== false && exist(x);
}

/**
 * 根据第一个谓词参数执行第二个函数参数并返回结果
 * @param {object} condition 谓词参数
 * @param {function} action 函数参数
 * @return {object} 执行结果
 * */
function doWhen(condition, action) {
  if (truest(condition)) {
    return action && action();
  } else {
    return undefined;
  }
}

/**
 * 深度复制一个源对象到目标对象
 * @author Daniel William
 * @param {object} sourceObject 源对象
 * @return {object} 新对象
 * 在使用递归算法时应尽量避免深层递归，递归过深会耗尽系统栈的内存，造成栈溢出。
 * */
function duplicate(sourceObject) {
  //输出复制的值
  let showCharsLength = 60;
  let info =
    sourceObject.toString().length < showCharsLength
      ? sourceObject.toString()
      : sourceObject.toString().substr(0, showCharsLength) + "...";

  console.log("[duplicate function] copy value ：%c" + info, "color:green");
  //粗颗粒度的判断类型
  switch (typeof sourceObject) {
    case "number":
    case "function":
    case "string":
    case "boolean":
    case "undefined":
      //非引用类型值直接返回复制值，复杂类型进入下方 object case 子句深度复制值
      //当前暂时将 function 直接返回
      return sourceObject;
    case "object":
      //进入到 object case子句，细颗粒度的判断 object 的类型
      //新的引用，用来存储复制的值
      let targetObject;
      switch (Object.prototype.toString.call(sourceObject)) {
        case "[object Null]":
          return sourceObject;
        case "[object Array]":
          //申请新的数组存储空间
          targetObject = [];
          //遍历数组元素
          for (let i = 0; i < sourceObject.length; i++) {
            //递归复制数组的值，可以复制值为 object 的数组值
            targetObject[i] = duplicate(sourceObject[i]);
          }
          return targetObject;
        case "[object Object]":
          //申请新的对象存储空间
          targetObject = {};
          //遍历对象属性
          for (const attribute in sourceObject) {
            //递归复制对象的值
            targetObject[attribute] = duplicate(sourceObject[attribute]);
          }
          return targetObject;
        default:
          console.warn("un know element type!");
          break;
      }
      break;
    default:
      console.warn("un know element type!");
      break;
  }
}

export {
  toArray,
  isString,
  isNumber,
  isNaN,
  isArray,
  isFunction,
  isIndexed,
  exist,
  truest,
  doWhen,
  duplicate
};
