### `lambdasλ` 纯的 javascript 函数范式文档
### 数据结构篇 data.structure
#### 树 Tree
##### 树的遍历
> 遍历`Tree`的常见方法是用递归的方式，但是用这种方式写出来的代码往往比较难以理解（虽然递归也是函数式编程中的一部分），为了解决这个问题，我想到了一个办法：既然 `Array`、`Map`、`Tree`、`Object`等等都是一种数据的容器，容器可以通过映射来变形为另一种容器，也可以通过映射来改变容器内的数据。那么`Array`有一个`map`方法，`Tree`也可以定义一个`map`方法，该方法与`Array#map`一样，接收一个迭代函数`f`，然后将容器中的每一项数据`v`作用与函数`f`，这样就得到了结果`r`，最后将结果集放到一个新的容器中返回，这样就得到了一个新的`Tree`。

```
Tree#map :: (node -> *) -> Tree
Tree#filter :: (node -> bool) -> Tree
Tree#find :: (node -> bool) -> node
Tree#findParent :: (node -> bool) -> node
```