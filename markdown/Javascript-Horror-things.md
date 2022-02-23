---
title: 'Javascript: Horror things'
date: 2018-06-21 15:20:21
tags: javascript
category: javascript
---
## `==` horor 
``` JS
1 == String(1); // true
new String(1) == new String(1); // false

0 == []; // true
0 == false; // true
[] == false; // true
[] == true; // false

console.log(0 ? "0 is true" : "0 is false"); // 0 is false

console.log([] ? "[] is true" : "[] is false"); // [] is true

0 == undefined; // false
0 == !!undefined; //true
```
*Note*

Type      | detach                     
:-------- | :------------------------
String    | '' ? 'falsy' : 'truth'     
Number    | 0orNaN ? 'falsy' : 'truth' 
Boolean   | false ? 'falsy' : 'truth'  
null      | 'falsy'                    
undefined | 'falsy'                    

## `===` hornor

``` JS
new String(1) === new String(1); // false

NaN === NaN; // false
```

## Array Hornor

``` JS
var a = [1,2,3];
console.log(a, 'length: ',a.length);//[1, 2, 3] "length: " 3
a[-1] = -1;
console.log(a, 'length: ',a.length);// [1, 2, 3, -1: -1] "length: " 3
a[-2] = -2;
console.log(a, 'length: ',a.length);//[1, 2, 3, -1: -1, -2: -2] "length: " 3

console.log(a[-2]);//-2
```