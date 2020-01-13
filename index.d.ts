// Array namespace

/**
 * 对数据进行一次索引行为，返回索引到的数据值
 * @param {object} dataSource 被索引目标数据
 * @param {number} index 索引值
 * @return {object} 执行结果
 * */
export function nth(dataSource: [], index: number): any;

/**
 * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
 * @param {object} dataSource 数据源参数
 * @param {function} itemAction 遍历行为
 * @return {void}
 * */
export function each(dataSource: [], itemAction: () => void): void;

/**
 * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
 * @param {object} dataSource 数据源参数
 * @param {function} itemAction 遍历行为
 * @return {object} 执行结果
 * */
export function map(dataSource: [], itemAction: () => any): any[];

/**
 * 接收一个元素和一个数组，将元素拼接到数组的前方后返回
 * @param {object} elem 元素
 * @param {array} arr 数组
 * @return {array} 拼接后返回的元素
 * */
export function construct(elem: any, arr: any[]): any[];

/**
 * 接收一个数据源参数与函数，返回按照排序函数指定数据进行排序的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
export function sortBy(dataSource: any[], pickup: (v: any) => number): any[];



// Collection namespace

/**
 * 接收一个集合参数与一个谓词，当对于集合中所有的元素谓词函数都返回 true 时，
 * 返回 true，否则返回 false
 * @param {object} dataSource 数据源
 * @param {function} pred 谓词函数
 * @return {boolean} 运算结果
 * */
export function allOf(dataSource: any[] | object, pred: (v: any) => boolean): boolean;

/**
 * 接收一个集合参数与一个谓词，当对于集合中有一个元素谓词函数返回 true 时，返回 true，否则返回 false
 * @param {object} dataSource 数据源
 * @param {function} pred 谓词函数
 * @return {boolean} 运算结果
 * */
export function anyOf(dataSource:any[] | object, pred: (v: any) => boolean): boolean;

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的所有元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的元素
 * */
export function filter(dataSource: any[] | object, pred: (v: any) => boolean): any[]; 

/**
 * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
 * @param {object} dataSource 数据源参数
 * @param {function} pred 谓词函数
 * @return {object} 符合条件的第一个元素
 * */
export function find(dataSource: any[] | object, pred: (v: any) => boolean): any;

/**
 * 接收一个返回谓词的函数参数，返回一个反转谓词参数执行结果的参数(补集)
 * @param {function} pred 返回谓词的函数参数
 * @return {function} Inversion results function
 * */
export function complement(pred: (v: any) => boolean): (v: any) => boolean; 

/**
 * 接收一个数据源参数与函数，返回按照数据拾取函数返回数据进行分组的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
export function groupBy(dataSource: any[] | object, pickup: (v : any) => string): object;

/**
 * 接收一个数据源参数与函数，返回按照的数据拾取函数返回数据进行统计数量的源数据
 * @param {object} dataSource 数据源参数
 * @param {function} pickup 数据拾取函数
 * @return {object} 排序结果
 * */
export function countBy(dataSource: any[] | object, pickup: (v: any) => string): object;

/**
 * 获取一个对象数组指定键的值
 * @param {array} objects 对象数组
 * @param {string} targetKey 目标键
 * @return {array} 值的数组
 * */
export function pluck(objects: any[] | object, targetKey: string): any[];

/**
 * 接收一个最佳值的比较规则函数与一个数据源, 返回数据源中的最佳值
 * @param {object|array} dataSource 数据源
 * @param {function} fun 比较谓词
 * @return {object} 数据源中的最佳值
 * */
export function best(dataSource: any[] | object, fun: (v: any) => boolean): any;

/**
 * 将一个数据源迭代归结为一个单一的值
 * @param {object} dataSource 数据源
 * @param {function} iterator 迭代函数
 * @param {object} memo 传递给迭代函数的初始值
 * @param {object} context 上下文绑定
 * @return {object} 结果
 * */
export function reduce(
  dataSource: any[] | object, 
  iterator: (
    iterativeValue: any, 
    data: any, 
    index: number, 
    dataSource: any[] | object
  ) => any, 
  memo: any, 
  context: any
): any;



// Function namespace

/**
 * 接收一个返回谓词的函数参数，返回一个根据参数数据返回 -1 | 0 | 1 格式的函数
 * @param {function} pred 返回谓词的函数参数
 * @return {function} 比较函数
 * */
export function comparator(pred: (x: any, y: any) => any): (x: any, y: any) => number;

/**
 * 返回一个常量的函数
 * TODO: 这种返回一个常量的函数非常有用，几乎是函数式编程的一个设计模式，经常被简称为 K.
 * @param {object} value 定义需要返回的常量
 * @return {object} 常量的值
 * */
export function always(value: any): () => any;

/**
 * 接收一个前馈函数与值的生成函数，当生成的值符合前馈函数的条件时，停止执行当前函数
 * @param {function} feedForward 前馈函数
 * @param {function} init 值的初始化函数
 * @return {array} result 结果
 * */
export function iterateUntil(feedForward: (value: any, index: number) => boolean, init: () => any): any[];

/**
 * 接收一个函数及一些额外的参数，并返回一个只是调用给定的原始函数的函数
 * @param {function} fun 原始函数
 * @return {function}　经过包装的原始函数
 * */
export function fnull(fun: (...args: any) => any, ...args: any): (...args: any) => any;

/**
 * 创建一个验证器
 * @param {string} message 验证失败后的错误消息
 * @param {function} fun 一套验证规则
 * @return {function} 验证器函数
 * */

interface validator{
  (message: string, fun: (...args: any) => boolean): (...args: any) => boolean;
}

export function validator(message: string, fun: (...args: any) => boolean): (...args: any) => boolean;

/**
 * 接收一组谓词函数，返回一个验证函数。返回的验证函数在给定对象上执行每个谓词，
 * 并对每一个返回 false 的谓词增加一个特殊的错误字符到一个数组中。
 * 如果所有的谓词返回 true, 那么最终返回的结果是一个空数组。否则，结果为错误消息的数组。
 * @return {function} 聚合了谓词函数的验证函数
 * */
export function checker(...validators: validator[]): (targetValidationData: any) => any;



// Lang namespace

/**
 * 接收一个源数据，将其转换为数组返回
 * @param {object} dataSource 源数据
 * @return {array} 转换后的结果
 * */
export function toArray(dataSource: object | Map<any, any> | any[]): any[];

/**
 * 判断传递进来的参数是否是字符串数据类型
 * @param {object} string 参数
 * @return {boolean} 参数是否为字符串
 * */
export function isString(string: any): boolean;

/**
 * 判断传递进来的参数是否是数字数据类型
 * @param {object} number 参数
 * @return {boolean} 参数是否为数字
 * */
export function isNumber(number: any): boolean;

/**
 * 判断传递进来的参数是否是 NaN 类型
 * @param {number} number 参数
 * @return {boolean} 参数是否为 NaN 类型
 * */
export function isNaN(number: any): boolean;

/**
 * 判断传递进来的参数是否是 Array 类型
 * @param {object} array 参数
 * @return {boolean} 参数是否为 Array 类型
 * */
export function isArray(array: any): boolean;

/**
 * 判断传递进来的参数是否为 function 类型
 * @param {function} func 函数参数
 * @return {boolean} 参数是否为函数类型的数据
 * */
export function isFunction(func: any): boolean;

/**
 * 判断传递进来的参数是否是支持数字索引的
 * @param {object} data 参数
 * @return {boolean} 参数是否为 Array 类型
 * */
export function isIndexed(data: any): boolean;

/**
 * 判断传递进来的参数是否存在（存在有效值）
 * @param {object} x 参数
 * @return {boolean} 参数是否存在有效值
 * */
export function exist(x: any): boolean;

/**
 * 判断传递进来的参数是否为 true 的同义词
 * @param {object} x 参数
 * @return {boolean} 参数是否为 true 的同义词
 * */
export function truest(x: any): boolean;

/**
 * 根据第一个谓词参数执行第二个函数参数并返回结果
 * @param {object} condition 谓词参数
 * @param {function} action 函数参数
 * @return {object} 执行结果
 * */
export function doWhen(condition: any, action: () => any): any;

/**
 * 深度复制一个源对象到目标对象，在使用递归算法时应尽量避免深层递归，递归过深会耗尽系统栈的内存，造成栈溢出。
 * @param {object} sourceObject 源对象
 * @return {object} 新对象
 * */
export function duplicate(sourceObject: any) : any;



// Object namespace

/**
 * 获取一个对象的所有键
 * @param {object} object 目标对象
 * @return {array} 对象所有键的数组
 * */
export function keys(object: object): string[];

/**
 * 获取一个对象的所有值
 * @param {object} object 目标对象
 * @return {array} 对象所有值的数组
 * */
export function values(object: object): any[]; 



// Utils namespace

/**
 * 往 html 文档中写一行内容
 * @return {void}
 * */
export function documentWriteln(...args: any): void;

/**
 * 往 html 文档中写入内容
 * @return {void}
 * */
export function documentWrite(...args: string[]): void;

/**
 * 抛出一个异常
 * @param {string} thing 异常描述
 * @return {void}
 * */
export function fail(thing: string): never;

/**
 * 向控制台输出一段警告文字
 * @param {string} thing 警告描述
 * @return {void}
 * */
export function warning(thing: string): void;

/**
 * 向控制台输出一段提示文字
 * @param {string} thing 提示文字描述
 * @return {void}
 * */
export function note(...args: string[]): void;

export namespace G{
  // Array namespace

  /**
   * 对数据进行一次索引行为，返回索引到的数据值
   * @param {object} dataSource 被索引目标数据
   * @param {number} index 索引值
   * @return {object} 执行结果
   * */
  function nth(dataSource: [], index: number): any;

  /**
   * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
   * @param {object} dataSource 数据源参数
   * @param {function} itemAction 遍历行为
   * @return {void}
   * */
  function each(dataSource: [], itemAction: () => void): void;

  /**
   * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
   * @param {object} dataSource 数据源参数
   * @param {function} itemAction 遍历行为
   * @return {object} 执行结果
   * */
  function map(dataSource: [], itemAction: () => any): any[];

  /**
   * 接收一个元素和一个数组，将元素拼接到数组的前方后返回
   * @param {object} elem 元素
   * @param {array} arr 数组
   * @return {array} 拼接后返回的元素
   * */
  function construct(elem: any, arr: any[]): any[];

  /**
   * 接收一个数据源参数与函数，返回按照排序函数指定数据进行排序的源数据
   * @param {object} dataSource 数据源参数
   * @param {function} pickup 数据拾取函数
   * @return {object} 排序结果
   * */
  function sortBy(dataSource: any[], pickup: (v: any) => number): any[];



  // Collection namespace

  /**
   * 接收一个集合参数与一个谓词，当对于集合中所有的元素谓词函数都返回 true 时，
   * 返回 true，否则返回 false
   * @param {object} dataSource 数据源
   * @param {function} pred 谓词函数
   * @return {boolean} 运算结果
   * */
  function allOf(dataSource: any[] | object, pred: (v: any) => boolean): boolean;

  /**
   * 接收一个集合参数与一个谓词，当对于集合中有一个元素谓词函数返回 true 时，返回 true，否则返回 false
   * @param {object} dataSource 数据源
   * @param {function} pred 谓词函数
   * @return {boolean} 运算结果
   * */
  function anyOf(dataSource:any[] | object, pred: (v: any) => boolean): boolean;

  /**
   * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的所有元素
   * @param {object} dataSource 数据源参数
   * @param {function} pred 谓词函数
   * @return {object} 符合条件的元素
   * */
  function filter(dataSource: any[] | object, pred: (v: any) => boolean): any[]; 

  /**
   * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
   * @param {object} dataSource 数据源参数
   * @param {function} pred 谓词函数
   * @return {object} 符合条件的第一个元素
   * */
  function find(dataSource: any[] | object, pred: (v: any) => boolean): any;

  /**
   * 接收一个返回谓词的函数参数，返回一个反转谓词参数执行结果的参数(补集)
   * @param {function} pred 返回谓词的函数参数
   * @return {function} Inversion results function
   * */
  function complement(pred: (v: any) => boolean): (v: any) => boolean; 

  /**
   * 接收一个数据源参数与函数，返回按照数据拾取函数返回数据进行分组的源数据
   * @param {object} dataSource 数据源参数
   * @param {function} pickup 数据拾取函数
   * @return {object} 排序结果
   * */
  function groupBy(dataSource: any[] | object, pickup: (v : any) => string): object;

  /**
   * 接收一个数据源参数与函数，返回按照的数据拾取函数返回数据进行统计数量的源数据
   * @param {object} dataSource 数据源参数
   * @param {function} pickup 数据拾取函数
   * @return {object} 排序结果
   * */
  function countBy(dataSource: any[] | object, pickup: (v: any) => string): object;

  /**
   * 获取一个对象数组指定键的值
   * @param {array} objects 对象数组
   * @param {string} targetKey 目标键
   * @return {array} 值的数组
   * */
  function pluck(objects: any[] | object, targetKey: string): any[];

  /**
   * 接收一个最佳值的比较规则函数与一个数据源, 返回数据源中的最佳值
   * @param {object|array} dataSource 数据源
   * @param {function} fun 比较谓词
   * @return {object} 数据源中的最佳值
   * */
  function best(dataSource: any[] | object, fun: (v: any) => boolean): any;

  /**
   * 将一个数据源迭代归结为一个单一的值
   * @param {object} dataSource 数据源
   * @param {function} iterator 迭代函数
   * @param {object} memo 传递给迭代函数的初始值
   * @param {object} context 上下文绑定
   * @return {object} 结果
   * */
  function reduce(
    dataSource: any[] | object, 
    iterator: (
      iterativeValue: any, 
      data: any, 
      index: number, 
      dataSource: any[] | object
    ) => any, 
    memo: any, 
    context: any
  ): any;



  // Function namespace

  /**
   * 接收一个返回谓词的函数参数，返回一个根据参数数据返回 -1 | 0 | 1 格式的函数
   * @param {function} pred 返回谓词的函数参数
   * @return {function} 比较函数
   * */
  function comparator(pred: (x: any, y: any) => any): (x: any, y: any) => number;

  /**
   * 返回一个常量的函数
   * TODO: 这种返回一个常量的函数非常有用，几乎是函数式编程的一个设计模式，经常被简称为 K.
   * @param {object} value 定义需要返回的常量
   * @return {object} 常量的值
   * */
  function always(value: any): () => any;

  /**
   * 接收一个前馈函数与值的生成函数，当生成的值符合前馈函数的条件时，停止执行当前函数
   * @param {function} feedForward 前馈函数
   * @param {function} init 值的初始化函数
   * @return {array} result 结果
   * */
  function iterateUntil(feedForward: (value: any, index: number) => boolean, init: () => any): any[];

  /**
   * 接收一个函数及一些额外的参数，并返回一个只是调用给定的原始函数的函数
   * @param {function} fun 原始函数
   * @return {function}　经过包装的原始函数
   * */
  function fnull(fun: (...args: any) => any, ...args: any): (...args: any) => any;

  /**
   * 创建一个验证器
   * @param {string} message 验证失败后的错误消息
   * @param {function} fun 一套验证规则
   * @return {function} 验证器函数
   * */

  interface validator{
    (message: string, fun: (...args: any) => boolean): (...args: any) => boolean;
  }

  function validator(message: string, fun: (...args: any) => boolean): (...args: any) => boolean;

  /**
   * 接收一组谓词函数，返回一个验证函数。返回的验证函数在给定对象上执行每个谓词，
   * 并对每一个返回 false 的谓词增加一个特殊的错误字符到一个数组中。
   * 如果所有的谓词返回 true, 那么最终返回的结果是一个空数组。否则，结果为错误消息的数组。
   * @return {function} 聚合了谓词函数的验证函数
   * */
  function checker(...validators: validator[]): (targetValidationData: any) => any;



  // Lang namespace

  /**
   * 接收一个源数据，将其转换为数组返回
   * @param {object} dataSource 源数据
   * @return {array} 转换后的结果
   * */
  function toArray(dataSource: object | Map<any, any> | any[]): any[];

  /**
   * 判断传递进来的参数是否是字符串数据类型
   * @param {object} string 参数
   * @return {boolean} 参数是否为字符串
   * */
  function isString(string: any): boolean;

  /**
   * 判断传递进来的参数是否是数字数据类型
   * @param {object} number 参数
   * @return {boolean} 参数是否为数字
   * */
  function isNumber(number: any): boolean;

  /**
   * 判断传递进来的参数是否是 NaN 类型
   * @param {number} number 参数
   * @return {boolean} 参数是否为 NaN 类型
   * */
  function isNaN(number: any): boolean;

  /**
   * 判断传递进来的参数是否是 Array 类型
   * @param {object} array 参数
   * @return {boolean} 参数是否为 Array 类型
   * */
  function isArray(array: any): boolean;

  /**
   * 判断传递进来的参数是否为 function 类型
   * @param {function} func 函数参数
   * @return {boolean} 参数是否为函数类型的数据
   * */
  function isFunction(func: any): boolean;

  /**
   * 判断传递进来的参数是否是支持数字索引的
   * @param {object} data 参数
   * @return {boolean} 参数是否为 Array 类型
   * */
  function isIndexed(data: any): boolean;

  /**
   * 判断传递进来的参数是否存在（存在有效值）
   * @param {object} x 参数
   * @return {boolean} 参数是否存在有效值
   * */
  function exist(x: any): boolean;

  /**
   * 判断传递进来的参数是否为 true 的同义词
   * @param {object} x 参数
   * @return {boolean} 参数是否为 true 的同义词
   * */
  function truest(x: any): boolean;

  /**
   * 根据第一个谓词参数执行第二个函数参数并返回结果
   * @param {object} condition 谓词参数
   * @param {function} action 函数参数
   * @return {object} 执行结果
   * */
  function doWhen(condition: any, action: () => any): any;

  /**
   * 深度复制一个源对象到目标对象，在使用递归算法时应尽量避免深层递归，递归过深会耗尽系统栈的内存，造成栈溢出。
   * @param {object} sourceObject 源对象
   * @return {object} 新对象
   * */
  function duplicate(sourceObject: any) : any;



  // Object namespace

  /**
   * 获取一个对象的所有键
   * @param {object} object 目标对象
   * @return {array} 对象所有键的数组
   * */
  function keys(object: object): string[];

  /**
   * 获取一个对象的所有值
   * @param {object} object 目标对象
   * @return {array} 对象所有值的数组
   * */
  function values(object: object): any[]; 



  // Utils namespace

  /**
   * 往 html 文档中写一行内容
   * @return {void}
   * */
  function documentWriteln(...args: any): void;

  /**
   * 往 html 文档中写入内容
   * @return {void}
   * */
  function documentWrite(...args: string[]): void;

  /**
   * 抛出一个异常
   * @param {string} thing 异常描述
   * @return {void}
   * */
  function fail(thing: string): never;

  /**
   * 向控制台输出一段警告文字
   * @param {string} thing 警告描述
   * @return {void}
   * */
  function warning(thing: string): void;

  /**
   * 向控制台输出一段提示文字
   * @param {string} thing 提示文字描述
   * @return {void}
   * */
  function note(...args: string[]): void;
}