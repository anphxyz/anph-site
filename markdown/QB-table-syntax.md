---
title: QB Table Description
date: 2018-05-08 11:18:32
tags: queenb
category: queenb
---
### TABLE NAME
  [1 character][3 number]{x}

### DESCRIPTION
  :CTB: -> Character Table Name (*)

### FIELD NAME 
1. Primary key:   
    + `[P][:CTB:][3 number]` same `[3 number]`{x}
2. Foreign key:   
    + `[F][:CTB:][3 number]`
3. Varchar field: 
    + `[:CTB:][V][3 number]`
4. Number field:  
    + `[:CTB:][N][3 number]`
6. Date field:   
    + `[:CTB:][D][3 number]`
7. Log field:   
    + `[:CTB:][L][3 number]`

### EXAMPLE 
 1. table: Q100 -> USER
 2. field: 
    + `QV101` -> user name
    + `QV102` -> password
    + `QN107` -> age
    + `QD109` -> birthday
    + `FN100` -> Foreign to table N100
    + `QL105` -> delete date
    + `QL106` -> eraser