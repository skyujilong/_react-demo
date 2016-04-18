/**
 * Created by YU on 2016/4/18.
 */
let a = 0;
if(true){
    //依然存在变量命名提升
    console.log(b);//测试是否有变量命名提升
    let b = 1;
    console.log(a);
}
//console.log(b);//报错 b未声明
for(let i = 0; i < 4; i++){
    console.log(i);//输出 0 1 2 3
}
//console.log(i);//报错