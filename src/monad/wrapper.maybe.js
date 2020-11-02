import { default as Wrapper } from './wrapper';

/**
 * 该类是 monad 函数范式实例 maybe 实现
 * 主要应用范围如下:
 *  1. 隔离不纯
 *  2. 合并判空逻辑
 *  3. 避免异常
 *  4. 支持函数组合
 *  5. 中心化逻辑，提供默认值
 * @author wei
 */
class WrapperMaybe extends Wrapper{
  /**
   * 包装一个值
   * @param {*} value 值
   * @return {WrapperJust} WrapperJust 实例
   */
  static just(value){
    return new WrapperJust(value);
  }

  /**
   * 包装一个值
   * @param {*} value 值
   * @return {WrapperJust} WrapperJust 实例
   */
  static of(value){
    return WrapperMaybe.fromNullable(value);
  }

  /**
   * 创建一个空容器
   * @return {WrapperNothing} WrapperNothing 实例
   */
  static nothing(){
    return new WrapperNothing();
  }

  /**
   * 由一个可为空的类型创建 Maybe
   * @param {*} value 值
   * @return {Wrapper} Wrapper 实例
   */
  static fromNullable(value){
    return (
      (
        value !== null &&
        value !== undefined
      ) ? 
      WrapperMaybe.just(value) : 
      WrapperMaybe.nothing()
    );
  }

  /**
   * 对象描述符
   * @return {string} 对象描述符
   */
  toString(){
    return `${super.toString()} -> WrapperMaybe`;
  }

  /**
   * 类型断言
   * @return {boolean} 结果
   */
  get isWrapperNothing(){
    return false;
  }

  /**
   * 类型断言
   * @return {boolean} 结果
   */
  get isWrapperJust(){
    return false;
  }
}

/**
 * 该类是 monad 函数范式实例 just 实现
 * 该类是一个值的容器，用于处理存在的值
 * @author wei
 */
class WrapperJust extends WrapperMaybe{
  /**
   * 映射一个函数到包装的值，并使用 Wrapper 包装结果后返回
   * @param {*} f 函数
   * @return {Wrapper} Wrapper 实例
   */
  map(f){
    return WrapperMaybe.of(f(this.value));
  }

  /**
   * monad 提供默认的一元操作，用于从中获取其值
   * @return {*} 返回包装的值
   */
  getOrElse(){
    return this.value;
  }

  /**
   * 如果存在的值满足所给的断言，则返回包含值的 Just 否则，返回 Nothing
   * @param {function} f 断言函数
   * @return {*} 返回包装的值
   */
  filter(f){
    return WrapperMaybe.fromNullable(f(this.value) ? this.value : null);
  }

  /**
   * 对象描述符
   * @return {string} 对象描述符
   */
  toString(){
    return `${super.toString()} -> WrapperJust`;
  }

  /**
   * 类型断言
   * @return {boolean} 结果
   */
  get isWrapperJust(){
    return true;
  }
}

/**
 * 该类是 monad 函数范式实例 nothing 实现
 * 该类是一个值的容器，用于为无值的情况提供保护
 * @author wei
 */
class WrapperNothing extends WrapperMaybe{
  /**
   * 不能从 WrapperNothing 中提取值
   * @return {undefined}
   */
  get value(){
    throw new TypeError('cant extract the value of a WrapperNothing.');
  }

  /**
   * WrapperNothing 会跳过 map 操作
   * @param {*} f 函数
   * @return {WrapperNothing} WrapperNothing 实例
   */
  map(f){
    return this;
  }

  /**
   * 忽略值
   * @param {*} value 值
   * @return {*} 返回传递的值
   */
  getOrElse(value){
    return value;
  }

  /**
   * 如果存在的值满足所给的断言，则返回包含值的 Just 否则，返回 Nothing
   * @return {*} 返回包装的值
   */
  filter(){
    return this.value;
  }

  /**
   * 对象描述符
   * @return {string} 对象描述符
   */
  toString(){
    return `${super.toString()} -> WrapperNothing`;
  }

  /**
   * 类型断言
   * @return {boolean} 结果
   */
  get isWrapperNothing(){
    return true;
  }
}

export default WrapperMaybe;