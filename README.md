# _react-demo
DEMO for react
##es6相关内容说明##
##let与cosn操作符##
###let###
let 允许把变量的作用域限制在块级域中。与 var 不同处是：var 申明变量要么是全局的，要么是函数级的，而无法是块级的。
eg:
```
{
    let a = 0;
    console.log(a); //输出0
}
console.log(a); //error
```
