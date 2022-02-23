---
title: Javascript shorthand
date: 2018-05-08 13:47:49
tags: javascript
category: javascript
---

## 1. Play with `.bind()`

``` JS
// document.querySelector
const $ = document.querySelector.bind(document);
// 1. Usage
const ele1 = $("#id1");
const ele2 = $(".class2");
const ele3 = $("div.user-panel.main input[name='login']");

// 2. console.log
const log = console.log.bind(document);
log('hello'); // -> hello
```

## 2. Clone object, array

a. Object
``` JS
// shallow clone an object 
const newObj = Object.assign({}, obj);
```
or
``` JS
// deep clone an object
const newObj = JSON.parse(JSON.stringify(obj));
```
b. Array
``` JS
  const a = [1, 2, 3];
  const b = a.slice();
  console.log(b);       // -> [1, 2, 3]
  console.log(b === a); // -> false
```

## 3. Swap value

``` JS
const x = 1, y = 2;
console.log(x, y); // 1, 2

[x, y] = [y, x];
console.log(x, y); // 2, 1
```

## 4. Random with range

``` JS
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
 
// Usage
const a = random(1, 100);
```

## 5. `trim()` DIY

``` JS
function trim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}
 
const str = "       Hello World!        ";
console.log(str)         // ->        Hello World!        
console.log(trim(str));  // -> Hello World!
```

## 6. Cast `arguments` to `Array`

``` JS
const args = Array.prototype.slice.call(arguments);
const args = [].slice.call(arguments);
 
// ES2015
const args = Array.from(arguments);
```

## 7. Max, min in array

``` JS
const numbers = [1, 8 , 10 , -125 , 28 , 100 , 215, -85]; 
const maxInNumbers = Math.max.apply(Math, numbers); 
const minInNumbers = Math.min.apply(Math, numbers);

console.log(maxInNumbers, minInNumbers);
// -> 215 -125
```

## 8. Reset Array

``` JS
const a = [1, 2, 3];
//a = [];//not this
a.length = 0;//use this
console.log(a); // -> []
```

## 9. Delete Array emlement

a. Wrong way
```JS
const arr = ["a", 1, -5, "cde"];
console.log(arr);        // -> ["a", 1, -5, "cde"]
delete arr[2];
console.log(arr);        // -> ["a", 1, undefined, "cde"]
console.log(arr.length); // -> 4
```
b. Right way
```JS
let arr = ["a", 1, -5, "cde"];
console.log(arr);        // -> ["a", 1, -5, "cde"]
arr.splice(2, 1);
console.log(arr);        // -> ["a", 1, "cde"]
console.log(arr.length); // -> 3
```

## 10. Use `&&` or `||` instead of `if` and `if else`

a. `if`
``` JS
let a = 10;
if (a === 10) console.log("a === 10"); // -> a === 10
if (a !== 5) console.log("a !== 5"); // -> a !== 5
```
->
``` JS
let a = 10;
a === 10 && console.log("a === 10"); // -> a === 10
a === 5 || console.log("a !== 5");   // -> a !== 5
```
b. `if else`
``` JS
let a = 10;
if (a === 5) console.log("a === 5");
else console.log("a !== 5");
```
->
``` JS
let a = 10;
a === 5 && console.log("a === 5") || console.log("a !== 5");
```

## 11. Loop object

(*) Use this way really effective when object is 1 level object
1. use `for..in`
``` JS
const object = {...};
for (let name in object) {  
    if (object.hasOwnProperty(name)) { 
        // do something with name                    
    }  
}
```

2. use `array prototype function` (map, forEach..)

``` JS
  const object = {...};
  Object.key(object).forEach(key=>{
        // do something with key                    
  })
```

## 12. Clone object and array use Spread

  a. Clone object:
  ``` JS
  let obj = {a: 1, b: 2};
  let obj2 = {...obj};
  console.log(obj2); // -> {a: 1, b: 2};
  ```
  b. Clone array:
  ``` JS
  let arr = [1, 2];
  let arr2 = [...arr];
  console.log(arr2); // => [1, 2];
  ```

## 13. Join Array

``` JS
let one = ['a', 'b', 'c']
let two = ['d', 'e', 'f']
let three = ['g', 'h', 'i']

// Old way #1
const result1 = one.concat(two, three);
console.log(result1);
// -> ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

// Old way #2
const result2 = [].concat(one, two, three);
console.log(result2);
// -> ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

// New
const result3 = [...one, ...two, ...three];
console.log(result3);
// -> ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
```

## 14. Set key from variable

``` JS
let myKey = 'key3';
let obj = {
    key1: 'One',
    key2: 'Two'
};
obj[myKey] = 'Three';
console.log(obj); // -> {key1: "One", key2: "Two", key3: "Three"}
```
->
``` JS
let myKey = 'key3';
let obj = {
    key1: 'One',
    key2: 'Two',
    [myKey]: 'Three'
};
console.log(obj); // -> {key1: "One", key2: "Two", key3: "Three"}
```

## 15. Cast value

``` JS
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}
```
->
``` JS
const variable2 = variable1  || 'new';
```

## 16. Object Property

``` JS
const obj = { x:x, y:y };
```
->
``` JS
const obj = { x, y };
```

## 17. Method

``` JS
var obj = {
  foo: function() {
    /* code */
  },
  bar: function() {
    /* code */
  }
};
```
->
``` JS
var obj = {
  foo() {
    /* code */
  },
  bar() {
    /* code */
  }
};
```

## 18. Parse Int (*) be careful

``` JS
let a = '123', b = '123a';
// Normal
console.log(parseInt(a), parseInt(b));//-> 123 123

//Advance
console.log(+a, +b);//-> 123 NaN

```

## 19. Verify variable (cast to boolean)

6 fasly value: `false, null, 0, '', undefined, NaN` will cast to `false` else cast to `true`
``` JS
if(typeof a !== 'undefined' && a !== null){
  //
}
```
->
``` JS
if(!!a){

}
```

## 20. Rest và spread

a. Rest: represents the rest: [phần còn lại] of `function`, `array` or `object` with variable name
``` JS
const [first, second, ...others] = [1, 2, 3, 4, 5]
console.log(first, second, others)
// 1 2 [3, 4, 5]
```

We can use rest to define a function flexible like bellow:
``` JS
const foo = (...args) => console.log('You passed', args)
console.log(foo(1, 2, 3)) // You passed[ 1, 2, 3 ]
const bar = (x, y, ...rest) => console.log(rest, x, y)
```
(*) `args` difference to `arguments`:
  `args` is normal array
  `arguments` is default in a function, an object like `Array`

b. Spread: represents the `object` or array `available` with variable name
 * replace `.concat()`
``` JS
const arr = [3, 4, 5]
const newArr = [1, 2, ...arr, 6]
console.log(newArr) // [1, 2, 3, 4, 5, 6]

const head = [1, 2]
const tail = [3, 4, 5]
console.log([...head, ...tail]) // [1, 2, 3, 4, 5]
```
 * replace `.apply()`
``` JS
const mul = (x, y, z) => x * y * z
const params = [1, 2, 3]
// mul.prototype.apply(null, params)
mul(...params)
```
 * replace `.asign()`
```JS
const user = { name: 'John' }
// ES5
const userWithAgeEs5 = Object.assign({}, user, { age: 21 })
// With spread
const userWithAge = { ...user, age: 21 }
console.log(userWithAge) // { name: 'John', age: 21 }

// bonus rest detruct
const { name, ...others } = userWithAge
console.log(others) // { age: 21 }
```

## 21. Create & set key by variable

``` JS
const attr = 'foo'
const year = 2017
const obj = { [attr]: 1, ['now' + year]: 'wow' }
console.log(obj) // { foo: 1, now2017: 'wow' }
```

## 22. Deduplicated item in array

``` JS
const a = ['red', 'blue', 'sweet', 'red', 'you']
const b = [...new Set(a)]
console.log(b) // [ 'red', 'blue', 'sweet', 'you' ]
```

## 23. Number to character

``` JS
console.log('0123456789'.split('').map(no => String.fromCharCode(65 + +no)))//["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

console.log('0123456789'.split('').map(no => String.fromCharCode(97 + +no)))//["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
```

## 24. Fast way Math.floor

``` JS
//similar way
const _a = Math.floor(10 / 3);//3
//fast way
const _b = ~~(10 / 3);//3
```