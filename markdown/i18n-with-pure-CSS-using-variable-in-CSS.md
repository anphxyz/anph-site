---
title: i18n with pure CSS (using variable in CSS)
date: 2018-05-09 10:52:19
tags: css
category: css
---

## CONTEXT
  1. Pure CSS ready support using variable
  2. I18N at client so quite complex

## IDEA
  1. Using new feature CSS custom properties (variables) + CSS Pseudo-elements `:before`, `:after`
  2. Change `html lang` attribute to change language

## CODE
  1. HTML
  ``` HTML
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
  </head>
  <body>
    <button id="change_lang"></button>
    <div class="wrapper">
      <form action="" id="login">
        <div class="form-group"><label for="username"></label>
        <input type="text" id="username"></div>
        <div class="form-group"><label for="password"></label>
        <input type="password" id="password"></div>
        <div class="form-group"><button type="submit"></button></div>
      </form>
    </div>
  </body>
  </html>
  ```
  2. JS
  ``` JS
  document.addEventListener('click',function(){
    if(document.documentElement.lang === 'en')
      document.documentElement.lang = 'vi'
    else
      document.documentElement.lang = 'en'
  });
  ```
  3. CSS
  ``` CSS
   :lang(en){
    --username:'Username ';
    --pasword: 'Password ';
    --login: 'Login';
    --lang:'Tiếng Việt'
  }

  :lang(vi){
    --username:'Tên đăng nhập ';
    --pasword: 'Mật khẩu ';
    --login: 'Đăng nhập';
    --lang:'English'
  }

  /*style to view*/
  *{font-family:monospace}
  body{background:#444}
  #change_lang{margin:0 0 5vh 12%;height:25px;border-radius:5px;display:inline-block;color:#fff;background:#333}
  .form-group{width:100%;padding:3px;display:inline-block}
  .form-group>label{width:100px;display:inline-block;color:#fff}
  .form-group>input{width:150px;display:inline-block;height:25px;border-radius:5px;box-shadow:none;border:1px solid #c1c1c1}
  .form-group>button{margin:0 100px;height:25px;border-radius:5px;display:inline-block;color:#fff;background:#333}
  /*style to view*/

  #change_lang:after{content:var(--lang)}
  [for='username']:after{content:var(--username)}
  [for='password']:after{content:var(--pasword)}
  [type="submit"]:after{content:var(--login)}
  ```

  ## DEMO

  [i18n with pure CSS](http://jsbin.com/qamojam/2)

  