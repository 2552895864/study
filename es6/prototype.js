Array;
class Array1 extends Array {

}

//通过空对象prototype继承Array的实例方法。举例：Array1.prototype.xxx，实际调用Array.prototype.xxx
console.log(JSON.stringify(Array1.prototype))   //{}
console.log(Array1.prototype=== Array)  //false
console.log(Array1.prototype === Array.prototype)   //false
console.log(Object.getPrototypeOf(Array1.prototype) === Array.prototype) //true

//将Array作为原型，继承静态方法和Symbol值
console.log(Object.getPrototypeOf(Array1) === Array)  //true

/*
    原型链探究
    1、几乎所有函数、类的原型链上都有同一个对象(除了Function.prototype.bind())，这个对象是Function.prototype
    2、Function本身就是一个函数，所以Function.prototype === Function.__proto__
    3、Object.prototype在几乎所有对象的原型链上(除了自身)
*/
console.log(Array instanceof Function) //true
console.log(Object instanceof Function)    //true
console.log(typeof Function.prototype.bind())   //function
console.log(Function.prototype.bind() instanceof Function)   //false

console.log(Function.prototype === Object.getPrototypeOf(Function))  //true

console.log(Function instanceof Object)  //true
console.log(Function.prototype instanceof Object)  //true
console.log(typeof Object.prototype)    //Object
console.log(Object.prototype instanceof Object)   //false