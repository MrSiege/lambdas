import {Stack} from "./data-structure";

/**
 * javascript 动态作用域的实现方式模拟
 * 动态作用域的基础是值的一个全局表
 * */
// 私有的全局查找表
const globals = {};
export default class ScopingSimulation{
    /**
     * 高阶函数：接收一个 resolver 函数，返回一个函数，该函数接收一个键与值，
     *  并且将值插入到以指定键为索引的全局表的值栈中。
     * @param {function} resolver 描述如何将值插入到值栈中的函数
     * @return {function} 该函数调用 resolver 函数将值插入到以指定键索引从全局表取得的值栈中。
     * */
    static makeBindFun(resolver){
        return function(key, value){
            let stack = globals[key] || new Stack({size:Infinity});
            globals[key] = resolver(stack, value);
            return globals;
        }
    }

    static getStackBinder(){
        /**
         * 接收一个键值对参数，将值推至对应键的全局绑定映射
         * @param {object} key 键
         * @param {object} value 值
         * @return {object} 全局绑定映射
         * */
        return ScopingSimulation.makeBindFun(function (stack, value) {
            stack.push(value);
            return stack;
        });
    }

    static getStackUnBinder(){
        /**
         * 接收一个键值对参数，将值对应键的全局绑定映射栈顶部的值弹出
         * @param {object} key 键
         * @param {object} value 值
         * @return {object} 全局绑定映射
         * */
        return ScopingSimulation.makeBindFun(function (stack) {
            stack.pop();
            return stack;
        });
    }

    /**
     * 接收一个键，返回键的全局绑定映射栈顶部的值
     * @param {object} key 键
     * @return {object} 指定键的全局绑定映射栈顶部的值
     * */
    static dynamicLookup(key) {
        let slot = globals[key] || new Stack({size:Infinity});
        return slot.peek();
    }

    /**
     * 获得私有全局表的引用
     * @return {object} 全局查找表的引用
     * */
    static getGlobals(){
        return globals;
    }
}