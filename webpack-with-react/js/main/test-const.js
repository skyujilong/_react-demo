/**
 * Created by YU on 2016/4/18.
 */

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