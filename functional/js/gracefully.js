/**
 * 关于函数式编程的一些通用的函数抽象单元，于 2019 年 2月13日学习《JavaScript函数式编程》一书时编写
 * @author danny
 * */
export default class _{
    /**
     * 往 html 文档中写一行内容
     * @return {this} 自身引用
     * */
    static documentWriteln() {
        document.writeln(...arguments, "<br/>");
        return _;
    };
    /**
     * 往 html 文档中写入内容
     * @return {this} 自身引用
     * */
    static documentWrite() {
        document.writeln(...arguments);
        return _;
    };
    /**
     * 抛出一个异常
     * @param {string} thing 异常描述
     * @return {void}
     * */
    static fail(thing) {
        throw new Error(thing);
    };
    /**
     * 输出一段警告文字
     * @param {string} thing 警告描述
     * @return {this} 自身引用
     * */
    static warning(thing){
        console.log(["WARNING:", thing].join(" "));
        return _;
    };
    /**
     * 输出一段提示文字
     * @param {string} thing 提示文字描述
     * @return {this} 自身引用
     * */
    static note(thing) {
        console.log(["NOTE:", thing].join(" "));
        return _;
    };
    /**
     * 判断传递进来的参数是否是字符串数据类型
     * @param {object} string 参数
     * @return {boolean} 参数是否为字符串
     * */
    static isString (string) {
        return _.exist(string) && typeof string === "string";
    };
    /**
     * 判断传递进来的参数是否是数字数据类型
     * @param {object} number 参数
     * @return {boolean} 参数是否为数字
     * */
    static isNumber (number) {
        return _.exist(number) && typeof number === "number";
    };
    /**
     * 判断传递进来的参数是否是 NaN 类型
     * @param {number} number 参数
     * @return {boolean} 参数是否为 NaN 类型
     * */
    static isNaN (number) {
        return Number.isNaN(number);
    };
    /**
     * 判断传递进来的参数是否是 Array 类型
     * @param {object} array 参数
     * @return {boolean} 参数是否为 Array 类型
     * */
    static isArray(array){
        return Array.isArray(array);
    };
    /**
     * 判断传递进来的参数是否为 function 类型
     * @param {function} func 函数参数
     * @return {boolean} 参数是否为函数类型的数据
     * */
    static isFunction(func){
        return _.exist(func) && typeof func === "function";
    }
    /**
     * 判断传递进来的参数是否是支持数字索引的
     * @param {object} data 参数
     * @return {boolean} 参数是否为 Array 类型
     * */
    static isIndexed(data){
        return _.isArray(data) || _.isString(data);
    };
    /**
     * 判断传递进来的参数是否存在（存在有效值）
     * @param {object} x 参数
     * @return {boolean} 参数是否存在有效值
     * */
    static exist(x){
        //在松散不等式的情况下，undefined = null
        return x != null;
    };
    /**
     * 判断传递进来的参数是否为 true 的同义词
     * @param {object} x 参数
     * @return {boolean} 参数是否为 true 的同义词
     * */
    static truest(x){
        return (x !== false) && _.exist(x);
    };
    /**
     * 根据第一个谓词参数执行第二个函数参数并返回结果
     * @param {object} condition 谓词参数
     * @param {function} action 函数参数
     * @return {object} 执行结果
     * */
    static doWhen(condition, action){
        if(_.truest(condition)){
            return action && action();
        }else{
            return undefined;
        }
    };
    /**
     * 对数据进行一次索引行为，返回索引到的数据值
     * @param {object} dataSource 被索引目标数据
     * @param {number} index 索引值
     * @return {object} 执行结果
     * */
    static nth(dataSource, index){
        if(!_.isNumber(index)){
            _.fail("Expected a number as the index");
        }
        else if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type")
        }
        else if((index < 0 ) || (index > dataSource.length - 1)){
            _.fail("Index value is out of bounds")
        }
        return dataSource[index];
    };
    /**
     * 接收一个返回谓词的函数参数，返回一个根据参数数据返回 -1 | 0 | 1 格式的函数
     * @param {function} pred 返回谓词的函数参数
     * @return {function} 比较函数
     * */
    static comparator(pred){
        return function (x, y) {
            if(_.truest(pred && pred(x, y))){
                return -1;
            }else if(_.truest(pred && pred(y, x))){
                return 1;
            }else{
                return 0;
            }
        }
    };
    /**
     * 接收一个生成值的函数参数与长度参数，返回一个由该函数生成初始值的数组
     * @param {function} generateValue 生成值的函数参数
     * @param {number} length 长度
     * @return {array} 数组
     * */
    static initialArray(generateValue, length){
        const array = [];
        for (let index = 0; index < length; index = index + 1) {
            array[index] = generateValue && generateValue(index);
        }
        return array;
    };
    /**
     * 接收一个数据源参数与遍历行为参数，依次对数据源的每一项掉用遍历行为函数
     * @param {object} dataSource 数据源参数
     * @param {function} itemAction 遍历行为
     * @return {this} 自身引用
     * */
    static each(dataSource, itemAction){
        if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type");
        }
        for(let index = 0; index < dataSource.length; index = index + 1){
            itemAction && itemAction(dataSource[index], index);
        }
        return _;
    };
    /**
     * 接收一个集合参数与一个谓词，当对于集合中所有的元素谓词函数都返回 true 时，
     * 返回 true，否则返回 false
     * @param {object} dataSource 数据源
     * @param {function} pred 谓词函数
     * @return {boolean} 运算结果
     * */
    static allOf(dataSource, pred){
        if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type");
        }
        if(!_.isFunction(pred)){
            _.fail("Expects data of a function type as a parameter");
        }
        let result = true;
        // arguments is array like of data
        const array = [...arguments];
        for (let index = 0; index < array.length; index = index + 1){
            const item = _.nth(array, index);
            result = pred(item) && result;
        }
        return result;
    };
    /**
     * 接收一个集合参数与一个谓词，当对于集合中有一个元素谓词函数返回 true 时，
     * 返回 true，否则返回 false
     * @param {object} dataSource 数据源
     * @param {function} pred 谓词函数
     * @return {boolean} 运算结果
     * */
    static anyOf(dataSource, pred){
        if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type");
        }
        if(!_.isFunction(pred)){
            _.fail("Expects data of a function type as a parameter");
        }
        let result = false;
        // arguments is array like of data
        const array = [...arguments];
        for (let index = 0; index < array.length; index = index + 1){
            const item = _.nth(array, index);
            result = pred(item) || result;
        }
        return result;
    };
    /**
     * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的所有元素
     * @param {object} dataSource 数据源参数
     * @param {function} pred 谓词函数
     * @return {object} 符合条件的第一个元素
     * */
    static filter(dataSource, pred){
        const result = [];
        _.each(dataSource, function (item) {
            if(pred(item)){
                result.push(item);
            }
        });
        return result;
    }
    /**
     * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
     * @param {object} dataSource 数据源参数
     * @param {function} pred 谓词函数
     * @return {object} 符合条件的第一个元素
     * */
    static find(dataSource, pred){
        if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type");
        }
        for(let index = 0; index < dataSource.length; index = index + 1){
            const item = _.nth(dataSource, index);
            if(pred && pred(item)){
                return item;
            }
        }
    };
    /**
     * 接收一个返回谓词的函数参数，返回一个反转谓词参数执行结果的参数(补集)
     * @param {function} pred 返回谓词的函数参数
     * @return {function} Inversion results function
     * */
    static complement(pred){
        if(_.isFunction(pred)){
            return function(){
                return !pred.apply(undefined, [...arguments]);
            }
        }else{
            _.fail("Expects data of a function type as a parameter");
        }
    };
    /**
     * 接收一个数据源参数与谓词函数，返回该谓词为 true 时的第一个元素
     * @param {object} dataSource 数据源参数
     * @param {function} condition 排序条件函数
     * @return {object} 排序结果
     * */
    static sortBy(dataSource, condition){
        
    };
}