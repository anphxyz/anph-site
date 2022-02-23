---
title: 'Design Pattern: Singleton Pattern'
date: 2018-05-08 15:04:57
tags: javascript
category: javascript
---
Improved from [module pattern](/2018/05/08/design-pattern-module-pattern/) :D
### Code
``` JS
const anph = (function () {
  let instance;// -> undefined
  function init() {
    //properties
    const a = 'A', n = 'n', p = 'p', h = 'h';
    //method
    getA = () => a;
    getN = () => n;
    getP = () => p;
    getH = () => h;
    getAnph = () => getA() + n + p + h;
    //what to public
    return { getAnph, getP };

  }
  return {
    getInstance: function () {
      if (!instance) //make sure only 1 object created
        instance = init();
      return instance;
    }
  }
})();


// console.log(anph.getInstance().getA()); // anph.getInstance(...).getA is not a function

console.log(anph.getInstance().getAnph());//Anph
```
### Demo
[Singleton Pattern](http://jsbin.com/becokebetu/edit?js,console)
