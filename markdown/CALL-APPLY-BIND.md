---
title: CALL, APPLY & BIND
date: 2018-06-01 09:53:32
tags: javascript
category: javascript
---
## CALL
- engsub: Call invokes the function and allows you to pass in arguments one by one with comma.
- vietsub: Gọi hàm và cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy(* Comma *)
``` JS
const teo = {  ten: 'Tèo', nickname:'Kuteo' };
const ty = { ten: 'Tý', nickname:'Cún' };

function chaoHoi(greeting, question) {
  console.log(greeting  + ' ' + this.ten + ' ' + this.nickname + ',' + question);
}

chaoHoi.call(teo, 'Chào', 'Năm nay bạn được mấy nồi bánh chưng rồi?'); // =>  Xin Chào Tèo Kuteo, Năm nay bạn được mấy nồi bánh chưng rồi?
chaoHoi.call(ty, 'Hế lô', 'Tết này bạn có ai để dẫn đi chơi chưa?'); // => Hế lô Tý Cún, Tết này bạn có ai để dẫn đi chơi chưa?
```

## APPLY
- engsub Apply invokes the function and allows you to pass in arguments as an array.
- vietsub: Gọi hàm và cho phép bạn truyền vào một object và các đối số thông qua mảng(*Array*)

``` JS
const teo = { ten: 'Tèo', nickname:'Kuteo' };
const ty = { ten: 'Tý', nickname:'Cún' };

function chaoHoi(greeting, question) {
  console.log(greeting + ' ' + this.ten + ' ' + this.nickname + ',' + question);
}

chaoHoi.apply(teo, ['Xin Chào', 'Năm nay bạn được mấy nồi bánh chưng rồi?']); 
//=>  Xin Chào Tèo Kuteo, Năm nay bạn được mấy nồi bánh chưng rồi?
chaoHoi.apply(ty, ['Hế lô', 'Tết này bạn có ai để dẫn đi chơi chưa?']); 
//=> Hế lô Tý Cún, Tết này bạn có ai để dẫn đi chơi chưa?
```
## BIND
- engsub Bind returns a new function, allowing you to pass in a this array and any number of arguments.
- vietsub: Trả về một hàm số mới, cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy.
``` JS
const teo = { ten: 'Tèo', nickname:'Kuteo' };
const ty = { ten: 'Tý', nickname:'Cún' };

function chaoHoi(greeting, question) {
  console.log(greeting + ' ' + this.ten + ' ' + this.nickname + ',' + question);
}

const chaoTeo = chaoHoi.bind(teo, 'Xin Chào', 'Năm nay bạn được mấy nồi bánh chưng rồi?');
const cakhiaTy = chaoHoi.bind(ty, 'Hế lô', 'Tết này bạn có ai để dẫn đi chơi chưa?');

chaoTeo(); // => Xin Chào Tèo Kuteo, Năm nay bạn được mấy nồi bánh chưng rồi?
cakhiaTy(); // => Hế lô Tý Cún, Tết này bạn có ai để dẫn đi chơi chưa?
```

[https://codeplanet.io/javascript-apply-vs-call-vs-bind/](https://codeplanet.io/javascript-apply-vs-call-vs-bind/)