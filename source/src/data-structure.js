/**
 * 数据结构 - 栈的实现
 * @author william caulfield
 * */
class Stack{
    /**
     * 构造函数
     * @constructor
     * @param {object} options
     * @param {number} options.size 栈的最大容量
     * */
    constructor({size}){
        if(typeof size === "number" && size > 0){
            this.dataSource = []; //数据源
            this.top = 0; //栈顶
            this.size = size;
        }else{
            throw Error("Please pass a meaningful stack size");
        }
    }
    /**
     * 向栈内添加元素
     * @param {object} element 元素参数
     * @return {boolean} 是否添加成功
     * */
    push(element){
        if(this.isFull()){
            return false;
        }
        this.dataSource[this.top] = element;
        this.top = this.top + 1;
    }
    /**
     * 弹出栈顶元素
     * @return {object} 栈顶元素
     * */
    pop(){
        if(this.isEmpty()){
            return undefined;
        }
        this.top = this.top - 1;
        return this.dataSource[this.top];
    }
    /**
     * 返回栈顶元素
     * @return {object} 栈顶元素
     * */
    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.dataSource[this.top - 1];
    }
    /**
     * 置空栈
     * @return {this} 自身引用
     * */
    empty(){
        this.top = 0;
        this.dataSource = [];
        return this;
    }
    /**
     * 判空栈
     * @return {boolean} 栈是否为空栈
     * */
    isEmpty() {
        return this.top === 0;
    }
    /**
     * 判满栈
     * @return {boolean} 栈是否已满
     * */
    isFull(){
        return this.top === this.size;
    }
}
/**
 * 数据结构 —— 环形队列
 * @author william caulfield
 * */
class Queue{

}
export {Stack, Queue};