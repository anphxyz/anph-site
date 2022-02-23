---
title: 'Design pattern: Module Pattern'
date: 2018-05-08 10:58:17
tags: javascript
category: javascript
---
### Code
```JS
const anph = (function () {
  //properties
  const a = 'A', 
    n = 'n',
    p = 'p',
    h = 'h';
  //method
  getA = ()=> a;
  getN = ()=> n;
  getP = ()=> p;
  getH = ()=> h;
  getAnph = () => getA() + n + p + h;
  //what to public
  return { getAnph, getP }

})();

console.log(a);//a is not defined

console.log(anph.getA()); // anph.getA is not a function

console.log(anph.getAnph());//Anph
```
### Demo
[Module Pattern](http://jsbin.com/jaxovomehi/edit?js,console,output)
