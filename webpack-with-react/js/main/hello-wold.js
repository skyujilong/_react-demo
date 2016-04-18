/**
 * Created by YU on 2016/4/16.
 */
import {say,test} from "../hello-world/hello";
var obj = require('../hello-world/hello');
import $ from "jquery";//fuck 这里高版本的jquery是支持 直接import的 其他的并不支持
//低版本的其实也可以用package.json配置jquery，之后引用的时候要用jquery/jquery才能找到有效的路径

//配合webpack的使用不建议使用 es6的包系统。 因为优化的时候会有问题
console.log(say);
console.log(test);
console.log(obj);
console.log('-------------------------------------------');
var obj2 = require('../hello-world/es6-export-demo');
console.log(obj2);
let {yjl} = obj2;
console.log(yjl.name());
$(document).ready(function(){
    $('#hello').text(say());
});
