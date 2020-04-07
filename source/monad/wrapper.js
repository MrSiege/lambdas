import { default as uuid } from '../utils/utils.uuid';

/**
 * 该类是 monad 函数范式顶层抽象
 * @author wei
 */
class Wrapper {
  /**
   * 构造函数
   * @param {*} value 值
   */
  constructor(value){
    // 完全将 value 封装在 wrapper 内部
    Object.defineProperty(this, '$value', {
      value: value,
      writable: false,
      enumerable: false,
    });

    Object.defineProperty(this, '$hashcode', {
      value: uuid(),
      writable: false,
      enumerable: false,
    });
  }

  /**
   * 获取包装的值
   * @return {*} 包装的值
   */
  get value(){
    return this.$value;
  }

  /**
   * 包装一个值
   * @param {*} value 值
   * @return {Wrapper} Wrapper 实例
   */
  static of(value){
    return new Wrapper(value);
  }

  /**
   * 映射一个函数到包装的值，并使用 Wrapper 包装结果后返回
   * @param {*} f 函数
   * @return {Wrapper} Wrapper 实例
   */
  map(f){
    return Wrapper.of(f(this.value));
  }

  /**
   * 展平嵌套多层的 Wrapper 结构
   * @return {Wrapper} Wrapper 实例
   */
  join(){
    if(this.value instanceof Wrapper){
      return this.value.join();
    }

    return this;
  }

  /**
   * 对象描述符
   * @return {string} 对象描述符
   */
  toString(){
    return `Wrapper monad hashcode$(${this.$hashcode})`
  }
}

export default Wrapper;