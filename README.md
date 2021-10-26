```
   __                    _          _             
  / /   __ _  _ __ ___  | |__    __| |  __ _  ___ 
 / /   / _` || '_ ` _ \ | '_ \  / _` | / _` |/ __|
/ /___| (_| || | | | | || |_) || (_| || (_| |\__ \
\____/ \__,_||_| |_| |_||_.__/  \__,_| \__,_||___/
```

## λ- `FP` 范式文档

参考书目与文献

- 《JavaScript函数式编程》作者 Michael Fogus，ISBN 9787115390608，人民邮电出版社
- 《JavaScript函数式编程指南》作者 Luis Atencio，ISBN 9787115462046，人民邮电出版社

- 《Category Theory For Programmers》作者 Bartosz Milewski，ISBN 9781518403507，ImageWrap Press
- 《An Introduction to Category Theory》作者 Harold Simmons，ISBN 9780511863226，Cambridge University Press

*注意：这个项目是用来学习交流 `FP` 范式的，请不要用于企业的生产环境。当然，个人的学习项目请随意使用。*

## Guide

- #### 安装依赖

```shell
npm install
```

- #### 运行测试套件

```shell
npm run test
```

- #### 生成静态文档

```
npm run docs
```

- #### 编译为 `UMD`

```
npm run build
```

编译完成后大家可以把 `dist/lambdas.min.js` 文件引入到项目中使用。

## 下面是关于我学习 `FP` 过程中的一些想法

*由于水平有限，有错误的地方欢迎提 `issues` 指出，非常期待能和大家一起交流*

- ### 树 Tree

1. Tree#map 树的自然变换

> 遍历 `Tree` 的常见方法是用递归的方式，但是用这种方式写出来的代码往往比较难以理解（虽然递归也是函数式编程中的一部分），为了解决这个问题，我想到了一个办法：既然 `Array`、`Map`、`Tree`、`Object`等等都是一种数据的容器，容器可以通过映射来变形为另一种容器，也可以通过映射来改变容器内的数据。那么 `Array` 有一个 `map` 方法，`Tree` 也可以定义一个`map`方法，该方法与 `Array#map` 一样，接收一个迭代函数 `f`，然后将容器中的每一项数据 `v` 作用与函数 `f`，这样就得到了结果 `r`，最后将结果集放到一个新的容器中返回，这样就得到了一个新的 `Tree`。

... 还有其他的一些想法，等有空再写，太忙了:)
