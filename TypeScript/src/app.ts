interface Introduce<T>{
	(name:string,age:T):string;
}
var introduce:Introduce<number> = function(name:string,age:number):string{
	return `${name} is ${age} years old`;
}
console.log(introduce('Bob',20));