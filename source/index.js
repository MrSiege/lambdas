// import * as arrays from "./array";
// import * as collections from "./collection";
// export * from "./function";
// export * from "./lang";
// export * from "./object";
// export * from "./utils";
// export * from "./data-structure";

// /**
//  * 关于函数式编程的一些通用的函数抽象单元，于 2019 年 2月13日学习《JavaScript函数式编程》一书时编写
//  * @author danny
//  * */
// const G = {
//   ...arrays,
//   ... collections
// };
// export 

import * as arrays from "./array";
import * as collections from "./collection";
import * as functions from "./function";
import * as langs from "./lang";
import * as objects from "./object";
import * as utils from "./utils";
import * as dataStructure from "./data-structure";

/**
 * 关于函数式编程的一些通用的函数抽象单元，于 2019 年 2月13日学习《JavaScript函数式编程》一书时编写
 * @author danny
 * */
const G = {
  ...arrays,
  ...collections,
  ...functions,
  ...langs,
  ...objects,
  ...utils,
  ...dataStructure,
};

export default G;