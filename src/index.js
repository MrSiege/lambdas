import * as arrays from './array';
import * as collections from './collection';
import * as combinators from './combinators';
import * as functions from './function';
import * as langs from './lang';
import * as objects from './object';
import * as utils from './utils';
import * as monads from './monad';
import * as dataStructures from './data.structure';

export * from './array';
export * from './collection';
export * from './combinators';
export * from './function';
export * from './lang';
export * from './object';
export * from './utils';
export * from './monad';
export * from './data.structure';

export default { 
  ...arrays, 
  ...collections, 
  ...combinators,
  ...functions,
  ...langs,
  ...objects,
  ...utils,
  ...monads,
  ...dataStructures,
}