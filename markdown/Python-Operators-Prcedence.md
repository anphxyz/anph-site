---
title: Python Operators Prcedence
date: 2019-03-26 16:54:45
tags: python
category: python
---
Python Operators Precedence
The following table lists all operators from highest precedence to lowest.


No |	Operator | Description 
-|-|-
1|()|(Highest precedence)	Parentheses (grouping)
2|f(args…)|Function call
3|(expressions…), [expressions…], {key: value…}, {expressions…}|Binding or tuple display, ist display, dictionary display, set display
4|x[index], x[index:index], x(arguments), x.attribute|Subscription, slicing, call, attribute reference
5|await x|Await expression
6|**|Exponentiation
7|+x, –x, ~x|Positive, negative, bitwise NOT
8|*, @, /, //, %|Multiplication, division, remainder
9|+, –|Addition, subtraction
10|<<, >>|Bitwise shifts
11|&|Bitwise AND
12|^|Bitwise XOR
13| \| |Bitwise OR
14|in, not in, is, is not, <, <=,  >, >=,1|<>, !=, == | Comparisons, membership, identity
15|not x|Boolean NOT
16|and|Boolean AND
17|or|Boolean OR
18|if- else|Conditional expression
19|lambda(Lowest precedence) | Lambda expression