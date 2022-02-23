---
title: Create JSON data from Form input
date: 2018-04-26 09:12:47
tags: html, javascript
category: javascript
---
### Problem:
  * How can I create a javascript JSON (?) object based on two input fields per row, with 48 rows?

### Solve:

1. Put all row to 1 form with unique name per input.
2. Get form data via jquery.
3. Use my formObj2Json() function convert form data to json with key per item is input unique name.

``` JS
$(function(){
  $(document).on('click', '#grap', function(){
  var formData = $('#anph').serializeArray(),
      rs = formObj2Json(formData);
  $('#rs').html(JSON.stringify(rs, undefined, 2));
});
})
function formObj2Json(formArray) { //serialize data function
  var returnArray = {};
  for (var i = 0, len = formArray.length; i < len; i++)
    returnArray[formArray[i].name] = formArray[i].value;
  return returnArray;
}
//ES6
var formObj2Json = formArray => formArray.map(elem => {return {[elem.name]: elem.value}})

```

``` HTML
<!DOCTYPE html>
<html>

<head>
  <meta name="description" content="Knockout 1">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Anph</title>
<script src="https://code.jquery.com/jquery-3.0.0.js"></script>
</head>
<body>
  <button id="grap">grap</button>
   <form id="anph">

     <div class="group">
       <label for="">label-1: </label>
       <input type="text" name="name1" value="name1">
       <input type="text" name="rating1" value="01">
     </div>
     <div class="group">
       <label for="">label-2: </label>
       <input type="text" name="name2" value="name2">
       <input type="text" name="rating2" value="02">
     </div>
     <div class="group">
       <label for="">label-3: </label>
       <input type="text" name="name3" value="name3">
       <input type="text" name="rating3" value="03">
     </div>
     <div class="group">
       <label for="">label-4: </label>
       <input type="text" name="name4" value="name4">
       <input type="text" name="rating4" value="04">
     </div>
     <div class="group">
       <label for="">label-5: </label>
       <input type="text" name="name5" value="name5">
       <input type="text" name="rating5" value="05">
     </div>
     <div class="group">
       <label for="">label-6: </label>
       <input type="text" name="name6" value="name6">
       <input type="text" name="rating6" value="06">
     </div>
     <div class="group">
       <label for="">label-7: </label>
       <input type="text" name="name7" value="name7">
       <input type="text" name="rating7" value="07">
     </div>
     <div class="group">
       <label for="">label-8: </label>
       <input type="text" name="name8" value="name8">
       <input type="text" name="rating8" value="08">
     </div>
     <div class="group">
       <label for="">label-9: </label>
       <input type="text" name="name9" value="name9">
       <input type="text" name="rating9" value="09">
     </div>
     <div class="group">
       <label for="">label-10: </label>
       <input type="text" name="name10" value="name10">
       <input type="text" name="rating10" value="10">
     </div>
     <div class="group">
       <label for="">label-11: </label>
       <input type="text" name="name11" value="name11">
       <input type="text" name="rating11" value="11">
     </div>
     <div class="group">
       <label for="">label-12: </label>
       <input type="text" name="name12" value="name12">
       <input type="text" name="rating12" value="12">
     </div>
     <div class="group">
       <label for="">label-13: </label>
       <input type="text" name="name13" value="name13">
       <input type="text" name="rating13" value="13">
     </div>
     <div class="group">
       <label for="">label-14: </label>
       <input type="text" name="name14" value="name14">
       <input type="text" name="rating14" value="14">
     </div>
     <div class="group">
       <label for="">label-15: </label>
       <input type="text" name="name15" value="name15">
       <input type="text" name="rating15" value="15">
     </div>
     <div class="group">
       <label for="">label-16: </label>
       <input type="text" name="name16" value="name16">
       <input type="text" name="rating16" value="16">
     </div>
     <div class="group">
       <label for="">label-17: </label>
       <input type="text" name="name17" value="name17">
       <input type="text" name="rating17" value="17">
     </div>
     <div class="group">
       <label for="">label-18: </label>
       <input type="text" name="name18" value="name18">
       <input type="text" name="rating18" value="18">
     </div>
     <div class="group">
       <label for="">label-19: </label>
       <input type="text" name="name19" value="name19">
       <input type="text" name="rating19" value="19">
     </div>
     <div class="group">
       <label for="">label-20: </label>
       <input type="text" name="name20" value="name20">
       <input type="text" name="rating20" value="20">
     </div>

<pre id="rs"></pre>

</body>
</html>
```

### Output

[Create JSON form form input](http://jsbin.com/daraxeqesi/1/edit?html,js,output)

[Create JSON form form input ES6](http://jsbin.com/noxedof/edit?js,console,output)