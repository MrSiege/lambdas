import { identity } from '../combinators';
import { map } from '../array';
import { compose } from '../function';

class Tree {
  constructor(data = {}, children = []){
    Object.assign(this, { data, children });
  }

  /**
   * 构建一个树节点
   * @param {object} data 节点数据
   * @param {array} children 子节点
   * @return {object} 树节点
   */
  static of(data = {}, children = []){
    return new Tree(data, children);
  }

  /**
   * 将函数 f 作用于树的每个节点
   * @param {function} f 迭代函数
   * @return {object} 映射结果
   */
  map(f){
    const data = f(Object.assign({}, this.data));
    const children = this.children.map(v => v.map(f));

    return Tree.of(data, children);
  }

  /**
   * 查找某个叶子节点
   * @param {function} f 查找函数
   * @return {object} 查找结果
   */
  find(f){
    if(f(this.data)) return this;
    return this.children.map(v => v.find(f)).find(identity);
  }

  /**
   * 查找某个叶子节点的父节点
   * @param {function} f 查找函数
   * @return {object} 查找结果
   */
  // findParent = (function(){
  //   const stack = [];

  //   const find = function (node, f) {
  //     stack.push(node);
  //     const { children = [] } = node;
  //     if(children.find(f)) return stack.pop();

  //     // return compose(
  //     //   v => map(v, a => find(a, f)),
  //     // )
  //     // return (
  //     //   chain(children)
  //     //   .map(v => find(v, f))
  //     //   .flattenDeep()
  //     //   .find(identity)
  //     //   .value()
  //     // );
  //   }

  //   return function (f) {
  //     stack.splice(0);
  //     return find(this, f);
  //   }
  // })()
}

export default Tree;