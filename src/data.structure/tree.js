import { identity } from '../combinators';

class Tree {
  constructor(data, children = []){
    this.data = data;
    this.children = children;
  }

  /**
   * 构建一个树节点
   * @param {object} data 节点数据
   * @param {array} children 子节点
   * @return {object} 树节点
   */
  static of(data, children){
    return new Tree(data, children);
  }

  /**
   * 将函数 mapping 作用于树的每个节点
   * @param {function} mapping 迭代
   * @return {object} 结果
   */
  map(mapping){
    const map = this.map;
    const fmap = f => v => map.call(v, f);

    const data = this.data;
    const children = this.children;

    return Tree.of(
      mapping(data),
      children.map(fmap(mapping))
    );
  }

  /**
   * 查找某个叶子节点
   * @param {function} assertion 断言
   * @return {object} 结果
   */
  find(assertion){
    const find = this.find;
    const fmap = f => v => find.call(v, f);

    const data = this.data;
    const children = this.children;

    if(!assertion(data)){
      return (
        children
        .map(fmap(assertion))
        .find(identity)
      )
    }

    return this;
  }
}

export default Tree;