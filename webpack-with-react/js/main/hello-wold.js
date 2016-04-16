/**
 * Created by YU on 2016/4/16.
 */
import {say,test} from "../hello-world/hello";
import $ from "jquery";//fuck 这里高版本的jquery是支持 直接import的 其他的并不支持

console.log(say);
console.log(test);
$(document).ready(function(){
    $('#hello').text(say());
});
