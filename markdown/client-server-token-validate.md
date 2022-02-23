---
title: client - server token validate
date: 2018-05-29 10:23:02
tags: algorithm
category: algorithm
---
## Diagram

 \#  | Action         | transfer             | Description                     
 --- | :-:            | :-:                  | ---                             
 1   | get list       | Client <-res- Server | :token = md5(DEFAULT_TOKEN + id)
 2   | edit, add, del | Client -req-> Server | attach :token to request        
 3   | server process | check before process | compare md5(DEFAULT_TOKEN + id) with :token

## :)
 Simple to understand and implement
 ## :( 
  need loop before response