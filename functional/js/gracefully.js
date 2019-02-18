import {Stack} from "./data-structure";
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
     * 接收一个数据源参数与排序函数，返回按照排序函数指定数据进行排序的源数据
     * @param {object} dataSource 数据源参数
     * @param {function} pickup 排序条件函数
     * @return {object} 排序结果
     * */
    static sortBy(dataSource, pickup){
        if(!_.isFunction(pickup)){
            _.fail("Expects data of a function type as a parameter");
        }
        if(!_.isIndexed(dataSource)){
            _.fail("Not supported on non-indexed type");
        }
        //模拟系统的堆栈帧
        const stack = new Stack({size:10000});
        //源数据镜像，这里复制一个镜像是为了不影响到源数据数组的结构
        const dataSourceMirroring = [];
        _.each(dataSource, function (item, index) {
            dataSourceMirroring[index] = item;
        });
        let keyIndex, key, temp;
        // 调用该函数完成一帧的排序
        const sort = function sort({i, j}){
            const originalI = i, originalJ = j;
            // init parameter
            keyIndex = i;
            key = dataSourceMirroring[i];
            while(i !== j){
                //寻找小于关键值的数据
                while(pickup(dataSourceMirroring[j]) >= pickup(key) && i < j){
                    j = j - 1;
                }
                //寻找大于关键值的数据
                while(pickup(dataSourceMirroring[i]) <= pickup(key) && i < j){
                    i = i + 1;
                }
                if(i !== j){
                    //交换索引 i 与索引 j 的值
                    temp = dataSourceMirroring[i];
                    dataSourceMirroring[i] = dataSourceMirroring[j];
                    dataSourceMirroring[j] = temp;
                }
            }
            //交换关键值到正确位置
            temp = dataSourceMirroring[j];
            dataSourceMirroring[j] = key;
            dataSourceMirroring[keyIndex] = temp;
            return {i: originalI, j: originalJ, partitionIndex:j}; //返回关键数据位置
        };
        //保存当前堆栈帧
        stack.push({i:0, j:dataSourceMirroring.length - 1});
        //开始模拟系统堆栈帧进行迭代
        while(!stack.isEmpty()){ // 判断是否是空栈，若不是空栈，则弹出栈顶进行一次划分
            const endpointIndex = stack.pop();
            const result = sort(endpointIndex);
            // 将未处理完成的子序列入栈，长度为 1 的子序列不需要压入堆栈
            if((result.partitionIndex - result.i) > 1){
                stack.push({i:result.i, j:result.partitionIndex - 1});
            }
            if((result.j - result.partitionIndex) > 1){
                stack.push({i:result.partitionIndex + 1, j:result.j});
            }
        }
        return dataSourceMirroring;
    };
    /**
     * 深度复制一个源对象到目标对象
     * @author Daniel William
     * @param {object} sourceObject 源对象
     * @return {object} 新对象
     * 在使用递归算法时应尽量避免深层递归，递归过深会耗尽栈的内存，造成栈溢出。
     * */
    static duplicate(sourceObject){
        //输出复制的值
        let showCharsLength = 60;
        let info = sourceObject.toString().length < showCharsLength ?
            sourceObject.toString() :
            sourceObject.toString().substr(0, showCharsLength) + "...";

        console.log("[duplicate function] copy value ：%c" + info, "color:green");
        //粗颗粒度的判断类型
        switch (typeof sourceObject) {
            case "number":
            case "function":
            case "string":
            case "boolean":
            case "undefined":
                //非引用类型值直接返回复制值，复杂类型进入下方 object case 子句深度复制值
                //当前暂时将 function 直接返回
                return sourceObject;
            case "object":
                //进入到 object case子句，细颗粒度的判断 object 的类型
                //新的引用，用来存储复制的值
                let targetObject;
                switch (Object.prototype.toString.call(sourceObject)) {
                    case "[object Null]":
                        return sourceObject;
                    case "[object Array]":
                        //申请新的数组存储空间
                        targetObject = [];
                        //遍历数组元素
                        for (let i = 0; i < sourceObject.length; i++){
                            //递归复制数组的值，可以复制值为 object 的数组值
                            targetObject[i] = _.duplicate(sourceObject[i]);
                        }
                        return targetObject;
                    case "[object Object]":
                        //申请新的对象存储空间
                        targetObject = {};
                        //遍历对象属性
                        for (const attribute in sourceObject) {
                            //递归复制对象的值
                            targetObject[attribute] = _.duplicate(sourceObject[attribute]);
                        }
                        return targetObject;
                    default:
                        console.warn("un know element type!");
                        break;
                }
                break;
            default:
                console.warn("un know element type!");
                break;
        }
    }
    /**
     * 将一个对象数组以指定目标键转为(键-值)映射
     * 如将对象数组 [{name:"danny", value:"311"}, {name:"LiLi", value:"18"}]
     * 指定键为 name 转为{danny:{name:"danny", value:"311"}, LiLi:{name:"LiLi", value:"18"}}
     * 在有多层数组嵌套的情况下，会进行递归解析
     * @author Daniel William
     * @param {object} sourceData 源数据
     * @param {string} targetKey 指定键，其值需要在源数据中唯一
     * @param {boolean} inline 是否直接将一个对象中的数组属性直接解析到对象中
     *     源数据 [{name:"danny", value:"311", friend:[{name:"LiLi", value:"18"}]}]
     *     指定为true时：
     *         {danny:{name:"danny", value:"311", LiLi:{name:"LiLi", value:"18"}}}
     *     指定为false时：
     *         {danny:{name:"danny", value:"311", friend:{LiLi:{name:"LiLi", value:"18"}}}}
     * @return {object} 映射方式存储对象
     * */
    static buildObjectMapperByArray(sourceData, targetKey, inline){
        //创建映射方式存储对象
        let objectMapper = {};
        //遍历源数据对象
        for(let i = 0; i < sourceData.length; i++){
            let item = sourceData[i];
            //创建映射
            objectMapper[item[targetKey]] = item;
            //检查是否有嵌套数组，遍历对象属性
            for(let attribute in item){
                //判断属性是否是自身属性
                let isSelfAttribute = Object.prototype.hasOwnProperty.call(item, attribute);
                //判断属性是否是数组类型
                if(isSelfAttribute && Object.prototype.toString.call(item[attribute]) === "[object Array]"){
                    //递归建立映射，根据是否内联的参数建立两种不同的嵌套映射
                    if(inline){
                        //去除属性名的包裹
                        let targetObject = _.buildObjectMapperByArray(item[attribute], targetKey, inline);
                        for(let attribute in targetObject){
                            objectMapper[item[targetKey]][attribute] = targetObject[attribute];
                        }
                    }else{
                        objectMapper[item[targetKey]][attribute] = _.buildObjectMapperByArray(item[attribute], targetKey, inline);
                    }
                }
            }
        }
        return objectMapper;
    }
}