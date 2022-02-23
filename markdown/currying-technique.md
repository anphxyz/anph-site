---
title: Currying Technique
date: 2018-05-10 14:31:32
tags: javascript
category: javascript
---

## THEORY CONCEPT

* English: Currying is when you break down a function that takes multiple arguments into a series of functions that take part of the arguments.
* Việt Ngữ: Currying là kỹ thuật phân rã hàm nhiều tham số thành series hàm nhận vào 1 hoặc nhiều tham số từ tập hơp tham số ban đầu.

## CONCEPT CODE
1. Normal
``` JS
//sum in normal
function sum(a, b){
  return a + b;
}
//-Arrow-
var sum = (a, b) => a + b;
//
call sum(1, 2);
```
2. Use currying
``` JS
//Sum with currying
function sum(a){
  return function(b){
    return a + b
  }
}
//-Arrow-
var sum a => b => a + b;
//call
sum(1)(2);
```

## DEMO
``` JS
const arr = [
  { key: 1, val: 'a' },
  { key: 2, val: 'b' },
  { key: 3, val: 'c' },
  { key: 4, val: 'd' }
],
get = attr => item => item[attr],
getKey = get('key'),
getVal = get('val'),
keyArray = arr.map(getKey),//[1, 2, 3, 4]
valArray = arr.map(getVal);//["a", "b", "c", "d"]
```




