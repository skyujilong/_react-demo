//解构赋值
var foo = [1, 2, 3, 4];
var [one,two,three] = foo;
console.log(one);
console.log(two);
console.log(three);
//对应赋值为 one=1,two=2,three=3
console.log('-----------------------------------------------');
var [a,,b,c] = foo;
console.log(a);
console.log(b);
console.log(c);
console.log('-----------------------------------------------');
//交换变量
var x = 1, y = 2;
[x,y] = [y, x];//后面的解析为数组
console.log('x:%d', x);
console.log('y:%d', y);
console.log('-----------------------------------------------');
//解构对象
var o = {xx: 20, yy: true};
var {xx,yy} = o;//属性名字的一样才能解构出来
console.log('xx:%o;yy:%o', xx, yy);

console.log('-----------------------------------------------');
//展开运算符
function f(x = [], y, z) {
    console.log(x);
    console.log(arguments);
}
var args = [undefined,1,3];
f(...args);