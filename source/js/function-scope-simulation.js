import _ from "./gracefully";

function strangeIdentity(n){
    for(var i = 0; i < n; i++){}
    // 这里能访问使用 var 关键字声明的变量 i, 在 javascript 中，
    // 所有在函数体内使用 var 声明的变量都会隐式地移到函数的顶部。
    // 如果变量 i 是由 let 关键字声明的，则不能在此访问，只能再 for 循环内访问。
    return i;
}
strangeIdentity(323);

function strangeIdentity1(n){
    for(this["i"] = 0; this["i"] < n; this["i"]++){}
    return this["i"];
}
strangeIdentity1.call({}, 1000);

function f(){
    this["a"] = 200;
    return this["a"] + this["b"];
}

var globals = {"b":2};
f.call(_.duplicate(globals));