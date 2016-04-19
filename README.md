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
###const###
const 声明创建一个只读的常量。这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。
eg:
```
console.log(a);//有变量声明提前特性
const a = '1';
//a = '2';//error;
//const b;必须赋值 否则 error
//b = 'c';//error
if(true){
    const b = 'a';
    console.log(b);
    //b = 'd';//error不能够赋值
}
//console.log(b);//error 是块级作用域
```