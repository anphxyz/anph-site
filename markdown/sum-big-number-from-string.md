---
title: Sum big number from string
date: 2019-03-14 13:48:10
tags: javascript
category: javascript
---
# Vấn đề:
Khi cần cộng 2 số quá lớn (big number) mà không thích `e` (1e9 = 1 000 000 000)
# Code
```JS
const sumStrings = (a, b) => {
  const aStr = a.split('').reverse(),
    bStr = b.split('').reverse(),
    alen = a.length, blen = b.length,
    len = alen > blen ? alen : blen
  let rs = [],
    remember = 0
  for (let i = 0; i <= len; i++) {
    const ai = +aStr[i]||0,
          bi = +bStr[i]||0,
          sumi = ai + bi + remember,
          rss = (sumi < 10 ? '0' : '') + sumi,
          [r, sumPoint] = rss.split('');
    remember = +r
    rs.push(sumPoint)
  }
  return rmvLeadZero(rs.reverse().join(''))
}
const rmvLeadZero = s => {
  while (s.charAt(0) === '0')
    s = s.substr(1)
  return s
}
```
EX:
```JS
sumStrings('123', '321')//"444"
sumStrings('8797927323', '3232321')//"8801159644"
```