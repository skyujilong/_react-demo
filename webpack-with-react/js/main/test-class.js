/**
 * Created by YU on 2016/4/18.
 */
    //不支持私有属性
class Person {
    constructor(name = 'yujilong', age = 20) {
        this.name = name;
        this.age = age;
    }
    say(){//写在了prototype上面了
        return this.name;
    }
    getAge(){
        return this.age;
    }
}
console.log(Person);
console.log(Person.prototype);
let personA = new Person(undefined,10);
//new 操作符
/**
 * 一个新对象被创建，继承自function的prototype
 * function执行，上下文是上面的新对象
 * 如果构造函数返回一个对象，则这个对象将取代new出来的结果。
 * 如果没有返回一个对象，则返回第一步创建的对象
 */
console.log(personA.name);
console.log(personA);
console.log(personA.say());
console.log(personA.getAge());
console.log(personA.__proto__);//上面的person的prototype 赋值到了 当前对象的 __proto__上面


class Boy extends Person{
    constructor(name,age,lover){
        super(name,age);//通过super关键字可以调用父类的constructor
        this.lover = lover;
    }
}
var boy = new Boy('sss',27,'xxx');
console.log(boy.say());
console.log(boy);