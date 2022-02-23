---
title: Star rate html + pure css
date: 2018-03-26 11:35:05
category: javascript
tags:
- javascript
- html
- css
---
### HTML
``` html
<fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" />
    <label class = "full" for="star5" title="Awesome - 5 stars"></label>
    
    <input type="radio" id="star4half" name="rating" value="4 and a half" />
    <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
    
    <input type="radio" id="star4" name="rating" value="4" />
    <label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    
    <input type="radio" id="star3half" name="rating" value="3 and a half" />
    <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
    
    <input type="radio" id="star3" name="rating" value="3" />
    <label class = "full" for="star3" title="Meh - 3 stars"></label>
    
    <input type="radio" id="star2half" name="rating" value="2 and a half" />
    <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
    
    <input type="radio" id="star2" name="rating" value="2" />
    <label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    
    <input type="radio" id="star1half" name="rating" value="1 and a half" />
    <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
    
    <input type="radio" id="star1" name="rating" value="1" />
    <label class = "full" for="star1" title="Sucks big time - 1 star"></label>
    
    <input type="radio" id="starhalf" name="rating" value="half" />
    <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
```

### CSS
``` css
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
fieldset,label{margin:0;padding:0;}
body{margin:20px;}
h1{font-size:1.5em;margin:10px;}

/****** Style Star Rating Widget *****/
.rating{border:none;float:left;}
.rating > input{display:none;}
.rating > label:before{margin:5px;font-size:1.25em;font-family:FontAwesome;display:inline-block;content:"\f005";}
.rating > .half:before{content:"\f089";position:absolute;}
.rating > label{color:#ddd;float:right;}

/***** CSS Magic to Highlight Stars on Hover *****/
.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label{color:#FFD700;}

/* hover previous stars in list */
.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label{color:#FFED85;}

```

If want to passive load we need push `disabled` attribute to all `input[type="text"]` and run JS code below:

``` JS
function calcRate(r) {
  var t = 5 === a ? star5 
    : r >= 4.5 ? star4half 
      : r >= 4 ? star4 
        : r >= 3.5 ? star3half 
          : r >= 3 ? star3 
            : r >= 2.5 ? star2half 
              : r >= 2 ? star2  
                : r >= 1.5 ? star1half 
                  : r >= 1 ? star1 
                    : r >= .5 ? starhalf 
                      : null;
  t && (t.checked = !0)
}
```

### OUTPUT

[Pure CSS Star Rating Widget](http://output.jsbin.com/dojovax/2)