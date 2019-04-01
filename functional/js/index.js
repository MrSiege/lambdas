import _ from "./gracefully";
import ScopingSimulation from "./scoping-simulation";
const {getStackBinder, getStackUnBinder, dynamicLookup, getGlobals} = ScopingSimulation;

_.note("开始模拟变量声明与取值，《Javascript 函数式编程—第三章，变量的作用域》");
const stackBinder = getStackBinder();
stackBinder("name", "benjamin eng.");
stackBinder("age", "21");
stackBinder("dear", "rou jia Sun.");
_.note("声明 name = \"benjamin eng.\"");
_.note("声明 age = \"21\"");
_.note("声明 dear = \"rou jia Sun.\"");
_.note("取 name 变量", dynamicLookup("name"));
_.note("声明 name = \"yi chen\"");
stackBinder("name", "yi chen");
_.note("取 name 变量", dynamicLookup("name"));
_.note("取 dear 变量", dynamicLookup("dear"));
_.note("当前全局查找表为：", JSON.stringify(getGlobals()));

_.note("《Javascript 函数式编程—第四章，高阶函数》");
// 将阶乘函数以无效参数守护函数包装
const list = [1, 2, 3, 4, null, 6];
_.note("源：", list);
const safeMult = _.fnull((total, n) => total * n, 1);
_.note("积为：" + _.reduce(list, safeMult));

const result = _.best(list, (x, y) => x > y);
_.note("最佳值：", result);

const alwaysPasses = _.checker(_.always(true), _.always(true));
_.note("对象效验器(成功测试)：", alwaysPasses({}));
const fails = _.validator("a failure in life", _.always(false));
const alwaysFails = _.checker(fails);
_.note("对象效验器(失败测试)：", alwaysFails({}));

function dispatch(){
    const functions = _.toArray(arguments);
    const size = functions.length;
    return function (target){
        let ret = undefined;
        const args = _.rest(arguments);
        for(let funIndex = 0; funIndex < size; funIndex++){
            let fun = functions[funIndex];
            ret = fun.apply(fun, _.construct(target, args));
            if(_.exist(ret))return ret;
        }
        return ret;
    };
}